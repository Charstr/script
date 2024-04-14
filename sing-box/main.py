import os
import json
import urllib.request
import ipaddress
import subprocess

# 定义下载链接
AWAvenuerl = "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Surge.txt"

# 下载txt文件到指定路径
def download_file(url, folder, filename):
    filepath = os.path.join(folder, filename)
    urllib.request.urlretrieve(url, filepath)
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

# 处理txt文件内容并转换为json格式
def process_txt_to_json(filename):
    rules = {"version": 1, "rules": []}
    rule = {}
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if line.startswith('#') or line == '':
                continue
            if line.startswith('.'):
                domain = line[1:]
                try:
                    # 检查是否是合法的 IP 地址或子网
                    ipaddress.ip_network(domain, strict=False)
                    rule.setdefault('ip_cidr', []).append(domain)
                except ValueError:
                    # 不是合法的 IP 地址，我们假设它是一个域
                    rule.setdefault('domain_suffix', []).append(domain)
        if rule:
            rules['rules'].append(rule)
    return rules

# 将处理后的内容保存为json文件
def save_json(data, filepath):
    with open(filepath, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

# 编译json文件为srs格式
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

# 主函数
def main():
    baseurl = "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/"
    urls = [
        "Copilot/Copilot.list",
        "Anthropic/Anthropic.list",
        "Gemini/Gemini.list",
        "OpenAI/OpenAI.list",
        "Scholar/Scholar.list",
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
        full_url = os.path.join(baseurl, url)
        filename = os.path.basename(url)
        json_filename = filename.replace('.list', '.json')
        filepath = download_file(full_url, download_folder, filename)
        rules = parse_list_file(filepath)
        json_filepath = os.path.join(json_folder, json_filename)
        save_json(rules, json_filepath)
        compile_json_to_srs(json_filepath, srs_folder)
        # 删除下载的txt文件
        os.remove(filepath)

    # 处理 AWAvenue 规则文件
    awa_filepath = download_file(AWAvenuerl, "jsons", "AWAvenue-Ads-Rule-Surge.txt")
    awa_rules = process_txt_to_json(awa_filepath)
    awa_json_filepath = os.path.join("jsons", "AWAvenue-Ads-Rule.json")
    save_json(awa_rules, awa_json_filepath)
    compile_json_to_srs(awa_json_filepath, "srs")
    os.remove(awa_filepath)

if __name__ == "__main__":
    main()
