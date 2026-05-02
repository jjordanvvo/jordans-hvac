from PIL import Image, ImageDraw, ImageFont
import os

logo = Image.open("logo_final.png").convert("RGBA")

# ── Favicon files ──────────────────────────────────────────────

def on_dark(size, logo_padding=0.1):
    """Logo centered on #0E1117 background at given square size."""
    bg = Image.new("RGBA", (size, size), (14, 17, 23, 255))
    pad = int(size * logo_padding)
    inner = size - pad * 2
    ratio = logo.width / logo.height
    if ratio >= 1:
        w, h = inner, int(inner / ratio)
    else:
        w, h = int(inner * ratio), inner
    resized = logo.resize((w, h), Image.LANCZOS)
    x = (size - w) // 2
    y = (size - h) // 2
    bg.paste(resized, (x, y), resized)
    return bg

# favicon-32.png
fav32 = on_dark(32, logo_padding=0.06)
fav32.save("favicon-32.png")
print("favicon-32.png  OK")

# favicon.ico  (embeds 16, 32, 48)
fav16 = on_dark(16, logo_padding=0.06)
fav48 = on_dark(48, logo_padding=0.06)
fav16.save("favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("favicon.ico     OK")

# apple-touch-icon.png (180x180, dark bg with generous padding)
touch = on_dark(180, logo_padding=0.10)
touch.save("apple-touch-icon.png")
print("apple-touch-icon.png  OK")

# ── Social share image (1200x630) ─────────────────────────────
W, H = 1200, 630
bg_color = (14, 17, 23)          # #0E1117
text_color = (230, 237, 243)     # --text
muted_color = (139, 148, 158)    # --muted
accent_color = (88, 166, 255)    # --blue

img = Image.new("RGB", (W, H), bg_color)
draw = ImageDraw.Draw(img)

# Subtle top/bottom accent lines
for y_line in [0, 1, H - 2, H - 1]:
    draw.line([(0, y_line), (W, y_line)], fill=(88, 166, 255, 80))

# Gradient-style center glow (soft ellipse)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
for r in range(260, 0, -4):
    alpha = int(22 * (1 - r / 260))
    gd.ellipse([(W//2 - r, H//2 - r), (W//2 + r, H//2 + r)], fill=(88, 166, 255, alpha))
img.paste(Image.new("RGB", (W, H), bg_color), mask=Image.new("L", (W, H), 255))
img = img.convert("RGBA")
glow_rgb = Image.new("RGB", (W, H), (88, 166, 255))
img.paste(glow_rgb, mask=glow.split()[3])
img = img.convert("RGB")

# Logo — centered, fits within ~240px tall
logo_h = 240
logo_w = int(logo.width * (logo_h / logo.height))
logo_sm = logo.resize((logo_w, logo_h), Image.LANCZOS)
img_rgba = img.convert("RGBA")
lx = (W - logo_w) // 2
ly = 108
img_rgba.paste(logo_sm, (lx, ly), logo_sm)
img = img_rgba.convert("RGB")
draw = ImageDraw.Draw(img)

# Fonts — try bold Arial for title, regular for subtitle
def load_font(paths, size):
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

font_title = load_font([
    "C:/Windows/Fonts/arialbd.ttf",
    "C:/Windows/Fonts/calibrib.ttf",
    "C:/Windows/Fonts/georgiab.ttf",
], 54)
font_sub = load_font([
    "C:/Windows/Fonts/arial.ttf",
    "C:/Windows/Fonts/calibri.ttf",
    "C:/Windows/Fonts/georgia.ttf",
], 30)

title    = "Jordan's Heating and Cooling"
subtitle = "HVAC Services  |  Hampton Roads, VA"

def centered_text(draw, text, font, y, color):
    bb = draw.textbbox((0, 0), text, font=font)
    tw = bb[2] - bb[0]
    draw.text(((W - tw) // 2, y), text, fill=color, font=font)

ty = ly + logo_h + 32
centered_text(draw, title,    font_title, ty,      text_color)
centered_text(draw, subtitle, font_sub,   ty + 72, muted_color)

img.save("social-share.png", quality=95)
print("social-share.png  OK (1200x630)")
