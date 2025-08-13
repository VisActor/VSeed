import os
import json
import re

def parse_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    components = {}
    chart_type_name = os.path.basename(file_path).replace('.md', '')
    
    # Split by horizontal rules and then process sections
    sections = re.split(r'\n---\n', content)
    
    # The first section is the chart type description
    chart_description_match = re.match(r'# (.*?)\n\n(.*?)\n\n', sections[0], re.DOTALL)
    if chart_description_match:
        chart_type_title = chart_description_match.group(1).strip()
        chart_type_description = chart_description_match.group(2).strip()
    else:
        chart_type_title = chart_type_name
        chart_type_description = ""

    # Regex to find components (h2 and h3)
    component_pattern = re.compile(r'\n(##|###) (.*?)\n(.*?)(?=\n(?:##|###) |$)', re.DOTALL)
    
    all_text = "\n".join(sections)
    matches = component_pattern.findall(all_text)

    chart_components_summary = []

    for _, comp_name, comp_content in matches:
        comp_name = comp_name.strip()
        comp_content = comp_content.strip()
        
        # Create a brief description (first line of content)
        brief_description = comp_content.split('\n')[0].strip()
        
        components[comp_name] = comp_content
        chart_components_summary.append({
            "component_name": comp_name,
            "description": brief_description
        })

    return chart_type_name, components, chart_components_summary

def process_all_files(md_dir, details_dir, json_dir):
    if not os.path.exists(details_dir):
        os.makedirs(details_dir)
    if not os.path.exists(json_dir):
        os.makedirs(json_dir)
        
    all_components = {}
    
    for filename in os.listdir(md_dir):
        if filename.endswith(".md"):
            file_path = os.path.join(md_dir, filename)
            chart_type_name, components, chart_components_summary = parse_markdown(file_path)
            
            # Add to all components, allowing reuse
            all_components.update(components)
            
            # Write JSON file for the chart type
            json_file_path = os.path.join(json_dir, f"{chart_type_name}.json")
            with open(json_file_path, 'w', encoding='utf-8') as jf:
                json.dump(chart_components_summary, jf, ensure_ascii=False, indent=2)

    # Write all unique component files
    for comp_name, comp_content in all_components.items():
        detail_file_path = os.path.join(details_dir, f"{comp_name}.md")
        if not os.path.exists(detail_file_path): # Avoid overwriting for reuse
             with open(detail_file_path, 'w', encoding='utf-8') as df:
                df.write(comp_content)

if __name__ == "__main__":
    md_for_llm_dir = "/Users/bytedance/Documents/GitHub/VSeed/llm_test/md_for_llm"
    new_type_details_dir = "/Users/bytedance/Documents/GitHub/VSeed/llm_test/new-type-details"
    new_type_json_dir = "/Users/bytedance/Documents/GitHub/VSeed/llm_test/new-type-json"
    
    process_all_files(md_for_llm_dir, new_type_details_dir, new_type_json_dir)
    print("Processing complete.")