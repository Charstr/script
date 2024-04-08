from urllib.parse import urljoin
import requests
import os
import json
import subprocess  # 导入subprocess库执行外部命令


def download_file(url, folder):
    filename = url.split('/')[-1]
    filepath = os.path.join(folder, filename)
    response = requests.get(url)
    with open(filepath, 'wb') as f:
        f.write(response.content)
    return filepath

def parse_list_file(filepath):
    rules = {
        "version": 1,
        "rules": []
    }
    rule = {}
    with open(filepath, 'r') as f:
        for line in f:
            line = line.strip()
            if line.startswith('#') or line == '':
                # 当遇到注释或空行时，如果rule有内容，则添加到rules中
                if rule:
                    rules['rules'].append(rule)
                    rule = {}  # 重置rule字典用于下一个块
            elif line.startswith('DOMAIN,'):
                rule.setdefault('domain', []).append(line.split(',')[1])
            elif line.startswith('DOMAIN-KEYWORD,'):
                rule.setdefault('domain_keyword', []).append(line.split(',')[1])
            elif line.startswith('DOMAIN-SUFFIX,'):
                rule.setdefault('domain_suffix', []).append(line.split(',')[1])
            elif line.startswith('IP-CIDR,') or line.startswith('IP-CIDR6,'):
                rule.setdefault('ip_cidr', []).append(line.split(',')[1])
        # 在文件结束时，确保将最后一个rule添加到rules中
        if rule:
            rules['rules'].append(rule)

    return rules

def convert_to_json(rules, json_folder, filename):
    filepath = os.path.join(json_folder, filename)
    with open(filepath, 'w') as f:
        json.dump(rules, f, indent=2)

def compile_json_to_srs(json_filepath, srs_folder):
    # 获取不带扩展名的文件名
    basename = os.path.basename(json_filepath).replace('.json', '')
    srs_filename = basename + '.srs'  # 新的文件名为.xx.srs
    srs_filepath = os.path.join(srs_folder, srs_filename)
    
    # 编译json文件到srs格式的命令
    compile_command = f"./sing-box rule-set compile {json_filepath} -o {srs_filepath}"
    
    # 利用subprocess运行外部命令
    process = subprocess.run(compile_command, shell=True, check=True)
    # 检查命令是否成功执行
    if process.returncode == 0:
        print(f"Compiled {json_filepath} to {srs_filepath}")
    else:
        print(f"Failed to compile {json_filepath}")


def main():
    baseurl = "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/"
    urls = [
        "Copilot/Copilot.list",
        "Claude/Claude.list",
        "OpenAI/OpenAI.list",
        "Telegram/Telegram.list",
        "GlobalMedia/GlobalMedia.list",
        "Global/Global.list"
        # Add more URLs if needed
    ]
    download_folder = "lists"
    json_folder = "jsons"
    srs_folder = "srs"  # 新建srs文件夹保存编译后的文件
    
    if not os.path.exists(download_folder):
        os.makedirs(download_folder)
    if not os.path.exists(json_folder):
        os.makedirs(json_folder)
    if not os.path.exists(srs_folder):
        os.makedirs(srs_folder)

    for url in urls:
        full_url = urljoin(baseurl, url)  # 拼接baseurl和url
        filename = os.path.basename(url)
        json_filename = filename.replace('.list', '.json')
        filepath = download_file(full_url, download_folder)  # 使用拼接后的完整URL
        rules = parse_list_file(filepath)
        convert_to_json(rules, json_folder, json_filename)
        # 编译json文件
        json_filepath = os.path.join(json_folder, json_filename)  # json文件的路径
        compile_json_to_srs(json_filepath, srs_folder)  # 执行编译
        
        os.remove(filepath)

    print("Conversion and compilation completed.")

if __name__ == "__main__":
    main()