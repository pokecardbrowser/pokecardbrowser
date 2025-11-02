import os
import re

baseString = '        <img class="card" src="/img/sets/<SET>/<FILENAME>.png">'

def sort_key(name):
    base = name.split('.')[0]
    m = re.match(r"(\d+)([a-z]*)", base)
    num = int(m.group(1))
    suffix = m.group(2)
    return (num, suffix)

files = sorted(os.listdir(), key=sort_key)
setId = input("Set ID: ")
for file in files:
    if file.endswith('.png'):
        filename = file[:-4]
        line = baseString.replace('<SET>', setId).replace('<FILENAME>', filename)
        print(line)