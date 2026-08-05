import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Regex to match `miniProject: { ... },` or without comma at the end
    # We'll use a non-greedy match that stops at the first `},` or `}`
    # To be safe, we match up to the Component line and the code line.
    
    # Actually, a simpler way is to find `miniProject: {` and then find the matching `}`.
    def remove_miniproject(text):
        while True:
            start_idx = text.find("miniProject: {")
            if start_idx == -1:
                break
                
            # Find the start of the line where `miniProject: {` is
            line_start = text.rfind('\n', 0, start_idx)
            if line_start == -1:
                line_start = 0
                
            brace_count = 0
            end_idx = -1
            for i in range(start_idx, len(text)):
                if text[i] == '{':
                    brace_count += 1
                elif text[i] == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        end_idx = i
                        break
            
            if end_idx != -1:
                # include trailing comma and whitespace if present
                if end_idx + 1 < len(text) and text[end_idx + 1] == ',':
                    end_idx += 1
                
                # We remove from line_start to end_idx + 1
                text = text[:line_start] + text[end_idx + 1:]
            else:
                break
                
        return text
        
    new_content = remove_miniproject(content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Removed miniProjects from {filepath}")

for root, dirs, files in os.walk('data'):
    for file in files:
        if file.endswith('.js') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

