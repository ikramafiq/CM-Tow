#!/usr/bin/env python3
"""
Remove background from logo image using PIL and color detection
"""
from PIL import Image
import os

def remove_background(input_path, output_path, color_tolerance=30):
    """
    Remove background from image by detecting the dominant color and making it transparent
    """
    # Open the image
    img = Image.open(input_path)
    
    # Convert to RGBA if not already
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Get image data
    data = img.getdata()
    
    # Detect background color (typically the corner color)
    # For this logo, the background appears to be white or a light color
    bg_color = img.getpixel((0, 0))  # Get top-left corner color
    
    # Create new image data with transparency
    new_data = []
    for item in data:
        # Check if pixel is similar to background color
        r, g, b = item[:3]
        bg_r, bg_g, bg_b = bg_color[:3]
        
        # Calculate color distance
        distance = abs(r - bg_r) + abs(g - bg_g) + abs(b - bg_b)
        
        # If color is similar to background, make it transparent
        if distance < color_tolerance:
            new_data.append((255, 255, 255, 0))  # Transparent
        else:
            new_data.append(item)
    
    # Update image
    img.putdata(new_data)
    
    # Save as PNG
    img.save(output_path, 'PNG')
    print(f"✓ Background removed! Saved to: {output_path}")

if __name__ == '__main__':
    # Set input and output paths
    input_file = './logo-original.png'  # Replace with your uploaded logo filename
    output_file = './src/assets/logos/medicto-logo.png'
    
    # Create output directory if it doesn't exist
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    if os.path.exists(input_file):
        remove_background(input_file, output_file, color_tolerance=40)
    else:
        print(f"Error: {input_file} not found")
