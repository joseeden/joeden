---
title: "Configuring Algolia Search"
description: "Configuring Algolia Search for Docusaurus"
sidebar_position: 17
tags: 
- Docusaurus
# last_update:
#   date: 7/14/2024
---




## Overview

This guide walks through the complete process of setting up Algolia DocSearch for a Docusaurus documentation site, from account setup to implementation.

**Prerequisites:**

- Docusaurus site deployed and publicly accessible
- Algolia account (free tier available)
- DocSearch approval from Algolia team

## Login to Algolia

1. Create Algolia Account:

    - Go to [algolia.com](https://algolia.com)
    - Click **Sign Up** to create a free account
    - Verify your email address
    - Complete the onboarding process

2. Apply for DocSearch:
    
    - Visit [docsearch.algolia.com](https://docsearch.algolia.com)
    - Click **Apply** button
    - Fill out the application form with:
   - **Website URL**: Your documentation site URL
   - **Email**: Your contact email
   - **Repository**: Link to your GitHub repository (if applicable)
   - **Description**: Brief description of your documentation

3. Wait for Approval:

    - Algolia team will review your application
    - Approval typically takes 1-3 business days
    - You'll receive an email with DocSearch credentials once approved

4. Access Your Dashboard:

    - Once approved, you'll receive an invitation email
    - Click **Accept this invitation to get started!**
    - You'll be redirected to the Algolia dashboard
    - Your DocSearch app will be pre-configured and ready to use

## Add Algolia to Docusaurus

1. Login to your Algolia account and Go to **Settings** → **API Keys**

    - **Application ID**: Copy this value for `YOUR_APP_ID`
    - **Search-Only API Key**: Copy this value for YOUR_SEARCH_API_KEY (NOT the Admin API Key)

      <div class='img-center'>

      ![](/img/docs/Screenshot-2026-01-12-070057.png)

      </div>

2. Go to **Search** → **Index** in your dashboard

    - Your index name will be listed there (you may need to create one if you haven't)
    - Common naming: your-site-name or joeden for your case

    If you don't have an index yet:

    - Create a new index in your Algolia dashboard
    - Name it something like your website name (e.g. `joeden` or joeden-docs)
    - Use this name for `YOUR_INDEX_NAME`

3. Install Algolia Search Plugin:

    ```bash
    npm install @docusaurus/theme-search-algolia
    ```

4. Update Docusaurus Configuration:

    Add the Algolia configuration to your `docusaurus.config.ts`:

    ```typescript
    // docusaurus.config.ts
    const config: Config = {
      // ... other config
      
      themeConfig: {
        // ... other theme config
        
        algolia: {
          appId: 'YOUR_APP_ID',                    
          apiKey: 'YOUR_SEARCH_API_KEY', 
          indexName: 'YOUR_INDEX_NAME',               
          contextualSearch: true,               
          searchParameters: {},                 
          searchPagePath: 'search',             
        },
        
        // ... rest of theme config
      },
    };
    ```

    Configuration Options:

    | Option | Description | Required |
    |--------|-------------|----------|
    | `appId` | Your Algolia Application ID | ✅ |
    | `apiKey` | Search-Only API Key (NOT Admin API Key) | ✅ |
    | `indexName` | Name of your Algolia search index | ✅ |
    | `contextualSearch` | Enable search within current section | ❌ |
    | `searchParameters` | Additional Algolia search parameters | ❌ |
    | `searchPagePath` | URL path for dedicated search page | ❌ |


4. Deploy Your Changes:

    For GitHub Pages deployment:
    ```bash
    git add .
    git commit -m "feat: add Algolia search functionality"
    git push
    ```

    GitHub Actions will automatically:

    - Install the required dependencies
    - Build your site with search functionality
    - Deploy to GitHub Pages

5. Verify Search Functionality:

    - Wait for deployment to complete
    - Visit your documentation site
    - Look for the search bar in the navbar (right side, next to dark mode toggle)
    - Test search functionality with your content

## Crawler Configuration

1. **Automatic Indexing**

    - Algolia's crawler automatically indexes your site content
    - Initial indexing may take several hours
    - Crawler runs periodically to keep content updated

2. **Manual Crawler Management**

    - Go to [dashboard.algolia.com](https://dashboard.algolia.com)
    - Navigate to **Data Sources** → **Crawler**
    - Click on your crawler to view/modify settings
    - **Important**: Don't delete or recreate the crawler - it's pre-configured

3. **Crawler Settings**

    The crawler is optimized for Docusaurus sites and includes:

    - Automatic content extraction
    - Proper heading hierarchy
    - Metadata indexing
    - Duplicate content handling

## Troubleshooting

1. **Search Bar Not Appearing**

    - Verify Algolia plugin is installed: `@docusaurus/theme-search-algolia`
    - Check configuration syntax in `docusaurus.config.ts`
    - Ensure all required fields are present
    - Clear browser cache and rebuild site

2. **No Search Results**

    - Wait for initial crawler indexing (can take hours)
    - Check if your site is publicly accessible
    - Verify crawler is running in Algolia dashboard
    - Check for crawler errors in dashboard

3. **API Key Issues**

    - Use **Search-Only API Key**, not Admin API Key
    - Verify API key hasn't expired
    - Check key permissions in Algolia dashboard

## Best Practices

1. **Content Optimization**

    - Use clear, descriptive headings
    - Include relevant keywords in content
    - Structure content with proper HTML hierarchy
    - Add meta descriptions to pages

2. **Search Experience**

    - Test search with common user queries
    - Monitor search analytics in Algolia dashboard
    - Customize search parameters if needed
    - Consider adding search shortcuts/hotkeys

3. **Maintenance**

    - Monitor crawler status regularly
    - Update search configuration as site grows
    - Review search analytics for improvements
    - Keep Algolia plugin updated

## Example Implementation

Here's the complete configuration used in this documentation:

```typescript
// docusaurus.config.ts
export default {
  themeConfig: {
    algolia: {
      appId: '1ZR3DE355U',
      apiKey: '3672b86f92bc4e796d84bb241974d430',
      indexName: 'joseedenio',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
    },
  },
};
```

## Resources

- [Algolia DocSearch Documentation](https://docsearch.algolia.com/docs/what-is-docsearch)
- [Docusaurus Search Documentation](https://docusaurus.io/docs/search)
- [Algolia Dashboard](https://dashboard.algolia.com)
- [DocSearch Application](https://docsearch.algolia.com/apply)

## Support

- **Algolia Support**: [support@algolia.com](mailto:support@algolia.com)
- **DocSearch Discord**: [Algolia Community Discord](https://discord.gg/algolia)
- **Docusaurus Discord**: [Docusaurus Community](https://discord.gg/docusaurus)