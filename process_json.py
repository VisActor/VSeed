import json
import os
import re

def get_descriptions_from_md(md_content):
    descriptions = {}
    # Regex to find all properties and their descriptions from the JSDoc comments
    pattern = re.compile(r"/\*\*(.*?)\*/\s*([a-zA-Z0-9_& ]+)", re.DOTALL)
    matches = pattern.findall(md_content)

    for match in matches:
        comment_block = match[0]
        prop_name_raw = match[1].strip()
        
        # Clean up the property name to handle cases like "XBandAxis & YLinearAxis"
        prop_name = prop_name_raw.split(':')[0].strip()

        # Extract description from the comment block
        desc_match = re.search(r"@description\s+(.*)", comment_block)
        if desc_match:
            description = desc_match.group(1).strip()
        else:
            # If no @description, use the summary line
            summary_match = re.search(r"\*\s*([^\n@]+)", comment_block)
            if summary_match:
                description = summary_match.group(1).strip()
            else:
                description = ""
        
        # Use the property name from the code as the key
        key_name = prop_name.replace('?', '').split(':')[0].strip()
        descriptions[key_name] = description
        
        # Handle cases like `chartType: 'area'`
        if ":" in prop_name_raw:
            type_name_match = re.search(r"chartType:\\s*'([^']*)'", prop_name_raw)
            if type_name_match:
                type_name = type_name_match.group(1)
                interface_name_match = re.search(r"interface\\s+([a-zA-Z]+)", md_content)
                if interface_name_match:
                    descriptions[interface_name_match.group(1)] = description


    return descriptions

def process_files():
    json_dir = "/Users/bytedance/Documents/GitHub/VSeed/llm_test/new-type-json/"
    md_dir = "/Users/bytedance/Documents/GitHub/VSeed/llm_test/new-type-details/"

    # 1. Build a comprehensive description dictionary from all markdown files
    all_descriptions = {}
    for md_filename in os.listdir(md_dir):
        if md_filename.endswith(".md"):
            md_path = os.path.join(md_dir, md_filename)
            with open(md_path, 'r', encoding='utf-8') as f:
                md_content = f.read()
                # Extract interface name for the main component
                interface_match = re.search(r"export interface (\w+)", md_content)
                if interface_match:
                    interface_name = interface_match.group(1)
                    
                descriptions = get_descriptions_from_md(md_content)
                all_descriptions.update(descriptions)
                
                # Add description for the main chart type from its `chartType` property
                chart_type_desc_match = re.search(r"/\*\*(.*?)\*/\s*chartType", md_content, re.DOTALL)
                if chart_type_desc_match and interface_match:
                    comment_block = chart_type_desc_match.group(1)
                    desc_match = re.search(r"@description\s+(.*)", comment_block)
                    if desc_match:
                         all_descriptions[interface_name] = desc_match.group(1).strip()


    # 2. Process each JSON file
    for json_filename in os.listdir(json_dir):
        if json_filename.endswith(".json"):
            json_path = os.path.join(json_dir, json_filename)
            
            with open(json_path, 'r', encoding='utf-8') as f:
                try:
                    json_data = json.load(f)
                except json.JSONDecodeError:
                    print(f"Skipping {json_filename} due to JSON decoding error.")
                    continue

            new_json_data = []
            for item in json_data:
                original_name = item.get("component_name")
                if not original_name:
                    continue

                new_item = {}
                new_item["componentName"] = original_name
                
                # Handle special cases for names
                if original_name == "XBandAxis & YLinearAxis":
                    new_item["name"] = "xBandAxis & yLinearAxis"
                elif original_name == "XLinearAxis & YBandAxis":
                    new_item["name"] = "xLinearAxis & yBandAxis"
                else:
                    new_item["name"] = original_name[0].lower() + original_name[1:]

                # Find description
                lookup_key = new_item["name"].split(' ')[0] # handle "xBandAxis & yLinearAxis"
                
                if original_name in all_descriptions:
                    new_item["description"] = all_descriptions[original_name]
                elif lookup_key in all_descriptions:
                    new_item["description"] = all_descriptions[lookup_key]
                else:
                    new_item["description"] = item.get("description", "") # fallback

                new_json_data.append(new_item)

            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(new_json_data, f, ensure_ascii=False, indent=2)
    print("All JSON files have been processed.")

process_files()
