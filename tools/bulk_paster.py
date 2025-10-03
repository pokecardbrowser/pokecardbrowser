import os

# --- Get multiline string to paste ---
print("Paste your string (finish with a single '.' on a line):")
lines = []
while True:
    line = input()
    if line == ".":
        break
    lines.append(line)
topaste = "\n".join(lines)

# --- Marker and insertion position ---
marker = input("Enter the marker string (e.g., </body> or </div>): ").strip()
position = input("Insert before or after the marker? ").strip().lower()
firstlast = input("Use first or last occurrence of marker? ").strip().lower()

# --- Get multiline string to paste ---
print("Excluded files (finish with a single '.' on a line):")
excludedfiles = []
while True:
    line = input()
    if line == ".":
        break
    excludedfiles.append(line)

# --- Iterate over HTML files ---
pages = os.listdir("./")
for page in pages:
    if not page in excludedfiles:
        if not page.endswith(".html"):
            page = os.path.join(page, "index.html")
        if not os.path.isfile(page):
            continue

        with open(page, "r", encoding="utf-8") as f:
            content = f.read()

        # --- Find marker index ---
        idx = content.find(marker) if firstlast == "first" else content.rfind(marker)

        if idx == -1:
            print(f"[!] Marker not found in {page}")
            continue

        # --- Insert content ---
        if position == "before":
            new_content = content[:idx] + topaste + "\n" + content[idx:]
        else:  # after
            new_content = content[:idx + len(marker)] + "\n" + topaste + content[idx + len(marker):]

        with open(page, "w", encoding="utf-8") as f:
            f.write(new_content)

        print(f"[+] Updated {page}")
    else:
        print(f"[-] Excluded {page}")