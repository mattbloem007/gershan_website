/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react'

export function onRenderBody(
  { setHeadComponents,
    setPreBodyComponents,
  }
) {
 setHeadComponents([
   <script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>,
   <link href="https://fonts.googleapis.com/css2?family=Arsenal+SC:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />

  ])
}
