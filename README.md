# Jordan's Heating and Cooling — Website

Production-ready single-page website for Jordan's Heating and Cooling, Newport News, VA.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Complete single-page site (all 12 sections) |
| `styles.css` | All styles, CSS variables, animations, responsive |
| `script.js` | Interactions: menu, FAQ, counters, form, scroll reveals |
| `netlify.toml` | Netlify deploy config + security headers |
| `README.md` | This file |

## Deploy to Netlify (30 seconds)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign in / create free account
3. Drag the entire `jordans-hvac` folder onto the Netlify drop zone
4. Site is live instantly — you'll get a `.netlify.app` URL
5. Add a custom domain in **Site settings → Domain management**

Contact form submissions will appear in **Netlify → Forms** automatically (no backend needed).

## Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New → Project → Browse** and select the folder
3. No config needed — Vercel detects static HTML
4. Deploy

> Note: Vercel does not natively handle Netlify Forms. For Vercel, replace the form with a service like Formspree or EmailJS.

## Quick Customization

### Update phone number
Search-replace `7577518332` and `(757) 751-8332` in `index.html`.

### Update email
Replace `jordanheatingcooling757@gmail.com` in `index.html`.

### Update address
Search for `9 Hudson Circle` in `index.html`.

### Change colors
All colors are CSS custom properties at the top of `styles.css`:
```css
:root {
  --blue:  #2563EB;   /* Primary accent */
  --navy:  #0F1B2D;   /* Dark sections */
  --amber: #F59E0B;   /* Star ratings only */
}
```

### Add Google Reviews link
Search for `href="#"` near "See All Reviews on Google" in `index.html` and replace `#` with the Google Business Profile URL.

### Add Facebook/Google links
Search for `social-btn` anchor tags in the Contact section and footer — replace `href="#"` with the actual URLs.

### Update the Google Map
The map iframe in the Service Area section is pre-configured for Newport News, VA. To center on a different location, replace the `src` attribute of the iframe.

## SEO Notes

- Schema.org `HVACBusiness` structured data is in the `<head>` of `index.html`
- Update `"url"` in the JSON-LD to the live domain once deployed
- All images have descriptive `alt` attributes
- Semantic HTML5 throughout (`header`, `nav`, `main`, `section`, `article`, `footer`)

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, iOS Safari 14+, Android Chrome 90+
