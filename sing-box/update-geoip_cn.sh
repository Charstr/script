#!/bin/bash

curl -Lo ip4_cn.nft https://raw.githubusercontent.com/DH-Teams/DH-Geo_AS_IP_CN/main/Geo_AS_IP_CN.txt
sed -i \
        -e '$!s/$/,/' \
        -e '$s/$/ }\n}/' \
        -e '1s/^/set ip4_cn {\n  typeof ip daddr\n  flags interval\n  elements = { /' \
        ip4_cn.nft

curl -Lo ip6_cn.nft https://raw.githubusercontent.com/DH-Teams/DH-Geo_AS_IP_CN/main/Geo_AS_IP_CN_6.txt
sed -i \
        -e '$!s/$/,/' \
        -e '$s/$/ }\n}/' \
        -e '1s/^/set ip6_cn {\n  typeof ip6 daddr\n  flags interval\n  elements = { /' \
        ip6_cn.nft