from PIL import Image

img = Image.open("logo_final.png").convert("RGBA")
pixels = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        # Make white/near-white pixels transparent
        if r > 235 and g > 235 and b > 235:
            pixels[x, y] = (r, g, b, 0)

img.save("logo_final.png")
print(f"Done — {w}x{h}px, white background removed")
