---
title: "Using a Custom Domain"
description: "Configure a Docusaurus custom domain with GitHub Pages, Porkbun, and Algolia"
sidebar_position: 18
tags:
- Docusaurus
# last_update:
#   date: 09/27/2026
---

## Overview

A custom domain gives the site its own address. 

My setup: GitHub Pages still hosts the files, and Porkbun connects the domain to GitHub. I might change it to Cloudflare in the distant future, but for now I am okay with Porkbun.

This guide moves the `joeden` site to `https://joseeden.com`. It also updates Algolia so search results use the new address.

| Setting          | Value                                |
| ---------------- | ------------------------------------ |
| Repository       | `joseeden/joeden`                    |
| Previous address | `https://joseeden.github.io/joeden/` |
| New address      | `https://joseeden.com/`              |
| Alternate host   | `www.joseeden.com`                   |
| Source branch    | `master`                             |
| Deployment file  | `.github/workflows/deploy.yaml`      |
| Algolia index    | `joseedenio`                         |

The new address does not include `/joeden/`. 

For example, the writings page becomes `https://joseeden.com/writings`.

## 1. Prepare the Change

1. Confirm access to the GitHub repository settings, Porkbun DNS, and the Algolia application.
2. Save a copy of the existing DNS records and Algolia crawler configuration.
3. Check the domain's nameservers in Porkbun. These instructions assume Porkbun manages the active DNS zone. If another provider manages it, edit records there instead.
4. Prepare and test the local changes before switching the live domain.
5. Schedule the GitHub domain setting, DNS changes, and deployment close together. The old build expects `/joeden/`, while the new build expects `/`.

**Note**: Editing local files does not change the live website. GitHub and Porkbun settings are separate from the repository.

### Before Pointing DNS to GitHub

For this migration, `joseeden.com` is already saved in the repository's Pages settings. Complete Porkbun DNS first in section 3, then return to GitHub for the DNS check in section 4.

For a fresh setup, open [repository Pages settings](https://github.com/joseeden/joeden/settings/pages), choose **GitHub Actions**, and save `joseeden.com` under **Custom domain** before changing the website DNS records. An initial failed DNS check is expected while the domain still points to parking records. Continue with Porkbun instead of waiting for that check to pass.

GitHub recommends this initial domain assignment before DNS changes. See [GitHub's setup order](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#about-custom-domain-configuration).

## 2. Update Docusaurus

### Set the Domain and Base Path

1. Open `docusaurus.config.ts` in the repository root.
2. Set the public URL and base path as shown below.
3. Keep the GitHub owner and repository names unchanged.

```typescript
url: 'https://joseeden.com',
baseUrl: '/',
organizationName: 'joseeden',
projectName: 'joeden',
```

`url` controls the public origin, and `baseUrl` controls the path below it. 
These settings also affect generated links and canonical URLs. 
See [Docusaurus deployment configuration](https://docusaurus.io/docs/deployment#configuration).

The `deploymentBranch` option does not choose the trigger branch for this Actions workflow.
The workflow's `on.push.branches` setting controls that behavior.

### Update Metadata and Share Links

1. Find `themeConfig.metadata` in the same file.
2. Update the existing social metadata entries.

```typescript
{ name: 'og:image', content: 'https://joseeden.com/img/about/winnie.jpeg' },
{ name: 'og:url', content: 'https://joseeden.com/' },
```

3. Review `src/theme/DocItem/ShareButton.js`. Build the article URL from the configured domain and the current path.

```javascript
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Inside the component, after obtaining location:
const { siteConfig } = useDocusaurusContext();
const articleUrl = new URL(location.pathname, siteConfig.url).href;
```

4. Use `encodeURIComponent(articleUrl)` when adding that URL to a social sharing query parameter.
5. Search the repository for old website addresses and hardcoded `/joeden/` asset paths.

```powershell
rg -n 'joseeden\.github\.io|/joeden/' docusaurus.config.ts src static plugins writings
```

Review matches individually. Repository links such as `github.com/joseeden/joeden` and Colab notebook links still refer to the GitHub repository and should remain unchanged.

### Build and Preview

Run these commands from `C:\Git\joeden` with Node.js and npm installed. The current deployment workflow uses Node.js 22.

```powershell
npm ci
npm run build
npm run serve
```

1. Open the local address printed by the server.
2. Check the homepage, a documentation page, and a writing.
3. Open a nested page directly and refresh it.
4. Check images, downloads, and navigation.
5. Check the Spanish locale under `/es/`.
6. Inspect generated HTML for canonical URLs that begin with `https://joseeden.com/`.

The preview runs on localhost, but production metadata should contain the public domain. Docusaurus documents this build and preview process in its [deployment guide](https://docusaurus.io/docs/deployment#testing-your-build-locally).

## 3. Configure Porkbun DNS

1. Open the domain's **Manage DNS Records** panel.
2. Find your domain, expand **Details**, and open **DNS Records**.
3. Remove conflicting parking or forwarding records for these two hosts. 

    Keep all the MX and TXT records shown. Those support email and domain verification.

    | Type  | Host             | Current value       |
    | ----- | ---------------- | ------------------- |
    | ALIAS | `joseeden.com`   | `uixie.porkbun.com` |
    | CNAME | `*.joseeden.com` | `uixie.porkbun.com` |

5. Select **Add Record**, choose its type, and enter the Host and Answer from the table.
6. Leave the default TTL, save, and repeat for each row.

    | Type    | Host        | Answer                 |
    | ------- | ----------- | ---------------------- |
    | A       | Leave blank | `185.199.108.153`      |
    | A       | Leave blank | `185.199.109.153`      |
    | A       | Leave blank | `185.199.110.153`      |
    | A       | Leave blank | `185.199.111.153`      |
    | CNAME   | `www`       | `joseeden.github.io`   |

The blank Host represents `joseeden.com`, often written as `@` in other DNS tools. 

The CNAME Answer contains neither `https://` nor `/joeden/`.

Use the [Porkbun DNS editor instructions](https://kb.porkbun.com/article/68-how-to-edit-dns-records) for adding and editing records.

### Where Do These IP Addresses Come From?

GitHub publishes these four IPv4 addresses in its official [custom domain documentation, under Configuring an apex domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain). They were checked on September 28, 2026.

- Use all four published addresses for the root domain's A records.
- These are shared GitHub Pages addresses, not IP addresses assigned specifically to `joseeden.com` or supplied by Porkbun.
- Porkbun stores the DNS records that direct visitors to GitHub Pages.
- GitHub uses the requested hostname and the repository's custom domain setting to serve the correct website.

**Note**: Check the official GitHub documentation when repeating this setup in the future. Use its current values if the published addresses change.

### Optional IPv6 Records

Add all four records below if IPv6 support is wanted, alongside the A records. Remove unrelated old AAAA records for the root host.

| Type | Host        | Answer                  |
| ---- | ----------- | ----------------------- |
| AAAA | Leave blank | `2606:50c0:8000::153`   |
| AAAA | Leave blank | `2606:50c0:8001::153`   |
| AAAA | Leave blank | `2606:50c0:8002::153`   |
| AAAA | Leave blank | `2606:50c0:8003::153`   |

### Check DNS

Run the following in PowerShell:

```powershell
Resolve-DnsName joseeden.com -Type A
Resolve-DnsName www.joseeden.com -Type CNAME
Resolve-DnsName joseeden.com -Type AAAA
```

- Compare A results with the four IPv4 addresses above.
- Confirm the CNAME target is `joseeden.github.io`.
- Expect AAAA results only if IPv6 was configured.
- Compare a public resolver if the local answer appears stale: `Resolve-DnsName joseeden.com -Type A -Server 1.1.1.1`.

## 4. Check GitHub Pages

After updating Porkbun, return to GitHub to validate the website records.

1. Open [Pages settings for joseeden/joeden](https://github.com/joseeden/joeden/settings/pages).
2. Confirm **Source** is **GitHub Actions** and **Custom domain** is `joseeden.com`.
3. If the domain is already saved, leave it in place and select **Check again**.
4. Wait for the DNS check to succeed before continuing to HTTPS setup.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-09-28001434.png)

    </div>

### DNS Check Unsuccessful

`NotServedByPagesError` means GitHub cannot confirm that the domain points to its Pages servers. This can appear before Porkbun is configured or while old DNS answers are cached.

<div class='img-center'>

![](/img/docs/Screenshot2026-09-27235843.png)

</div>

1. Check the root A records against the Porkbun table above.
2. Confirm `www` points to `joseeden.github.io`, rather than `uixie.porkbun.com`.
3. Remove conflicting parking records for the root and `www`, including a root ALIAS if present.
4. Run the DNS checks from the previous section and allow propagation time.
5. Return to GitHub and select **Check again**.

The repository already builds `build/`, uploads it with `actions/upload-pages-artifact`, and publishes it with `actions/deploy-pages`. No workflow change is needed for this domain.

### Is a CNAME File Needed?

For this Actions deployment, GitHub ignores a `CNAME` file. Set the domain in Pages settings.

For a different setup that publishes generated files from a branch, add `static/CNAME` containing only the domain, so Docusaurus copies it into the build root:

```text
joseeden.com
```

See [GitHub custom domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## 5. Verify Ownership in GitHub

Ownership verification uses a TXT record at the account level. It is separate from the repository's website DNS check and can also be completed before the migration.

1. Open [GitHub account Pages settings](https://github.com/settings/pages), rather than the repository settings.
2. Select **Add a domain**, enter `joseeden.com`, and select **Add domain**.
3. Copy the TXT record name and value GitHub displays.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-09-28001759.png)

    </div>

4. In Porkbun, open **Domain Management**, select `joseeden.com`, and open **DNS Records**.
5. Add a new record and select TXT as the type.

    | Field          | Value                                          |
    | -------------- | ---------------------------------------------- |
    | Type           | `TXT – Text record`                            |
    | Host           | `_github-pages-challenge-joseeden`             |
    | Answer / Value | Paste the verification code provided by GitHub |
    | TTL            | Keep `600`                                     |
    | Notes          | Optional: `GitHub Pages domain verification`   |

    Porkbun automatically appends `.joseeden.com` to the `Host`.

6. Return to Github pages and click **Verify**. 

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-09-28002120.png)

    </div>

Keep this TXT record after verification. If the domain already appears as verified, keep the record and skip these steps. 

See [GitHub domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

## 6. Deploy and Enable HTTPS

Open the local copy of your Docusaurus web site. 

1. Review the local diff and confirm the production build succeeds.
2. When ready to publish, commit the intended files and push them to `master`.
3. Open [repository Actions](https://github.com/joseeden/joeden/actions) and select **Deploy to GitHub Pages**.
4. Wait for both **Build Docusaurus** and **Deploy to GitHub Pages** to succeed.
5. Return to Pages settings and wait for the domain check and certificate provisioning.
6. Enable **Enforce HTTPS** when available.

DNS propagation and HTTPS availability can take up to 24 hours. 

With both hosts configured, GitHub redirects `www.joseeden.com` to the chosen root domain. See [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

**Note**: My current workflow currently runs on pushes to `master`. It does not define `workflow_dispatch`, so a manual **Run workflow** button is not expected.

## 7. Update Algolia DocSearch

Changing Docusaurus does not rewrite existing Algolia records. Complete this section after the new HTTPS site works.

### Open the Existing Application

1. Sign in to the [Algolia dashboard](https://dashboard.algolia.com).
2. Select the application matching `themeConfig.algolia.appId` in `docusaurus.config.ts`. The current value is `1ZR3DE355U`.
3. Confirm the search index is `joseedenio`.
4. Open [Crawler](https://dashboard.algolia.com/crawler), or use **Data sources → Crawler**.
5. Select the existing crawler and save a copy of its configuration before editing.

Keep the existing application, index name, and search API key unless the account setup requires a change. The domain alone does not require a new frontend integration.

### Add and Verify the New Domain

1. Open the crawler's **Domains** area and add `joseeden.com` if it is not already listed.
2. Select a verification method offered by the dashboard.
3. For DNS verification, copy Algolia's TXT record into Porkbun using the exact name and value supplied.
4. Wait for DNS propagation and select **Verify now** in Algolia.
5. Complete any DocSearch approval requirement shown for the new domain before starting the crawl.

Algolia's verification is separate from GitHub's TXT record. Keep both records. See [Algolia domain verification](https://docsearch.algolia.com/docs/create-crawler/#verify-your-domain).

**Note**: Dashboard labels and access differ between older and newer DocSearch applications. If the domain or crawler cannot be edited, request access through Algolia support rather than creating a replacement crawler.

### Change Crawler URLs

1. Open the existing crawler configuration editor.
2. Find the old domain and `/joeden/` prefix in its URL settings.
3. Update `startUrls` and any configured `sitemaps` to the new site.

```javascript
startUrls: ['https://joseeden.com/'],
sitemaps: ['https://joseeden.com/sitemap.xml'],
```

4. Update each applicable action's `pathsToMatch`. For an action that already indexes the whole site, use:

```javascript
pathsToMatch: ['https://joseeden.com/**'],
```

5. Preserve narrower scopes if they were intentional. For example, replace an old docs-only pattern with `https://joseeden.com/docs/**` and preserve a separate Spanish pattern under `/es/docs/**`.
6. Review `discoveryPatterns` and `exclusionPatterns`, if present, for old hostnames or path prefixes.
7. Keep each action's `indexName`, extraction function, and existing language and version metadata.
8. Save the configuration.

These are partial edits to the existing configuration, not a replacement crawler file. The [Algolia start URLs reference](https://www.algolia.com/doc/tools/crawler/apis/configuration/start-urls) explains entry URLs, and the [DocSearch templates](https://docsearch.algolia.com/docs/templates/) show action matching and extraction settings.

### Test and Run the Crawl

1. Confirm `https://joseeden.com/robots.txt` and `https://joseeden.com/sitemap.xml` are accessible.
2. Inspect the sitemap and confirm its page URLs use the new domain.
3. Use the crawler's URL tester on a real documentation page copied from the live site.
4. Check that extracted records contain the correct title, headings, content, and new URL.
5. Start a full crawl using the crawler interface and wait for completion.
6. Review failed or skipped URLs and any publishing or safety-check errors.
7. Browse records in `joseedenio` and confirm their `url` fields use `https://joseeden.com/`.

Do not delete the default DocSearch crawler to force a refresh. Algolia documents manual crawling, URL testing, and access recovery in its [crawler FAQ](https://docsearch.algolia.com/docs/crawler/).

### Test Search on the Website

1. Open the live site's search box and search for a known page title.
2. Open several results and confirm their URLs use the new domain.
3. Test English and Spanish pages because contextual search is enabled.
4. If search requests fail, inspect the browser's Network panel and the configured search key in Algolia.
5. If that key has HTTP referrer restrictions, update them to allow the new website using the dashboard's accepted pattern format.
6. If old records remain, confirm the full crawl published to `joseedenio` and no other crawler is still writing old URLs into it.

Keep using a search-only API key in the frontend. For the original integration, see [Configuring Algolia Search](./017-Configuring-Algolia-Search.md).

## 8. Validate the Migration

1. Open `https://joseeden.com/` in a private browser window.
2. Confirm `https://www.joseeden.com/` reaches the same site.
3. Confirm plain HTTP redirects to HTTPS after enforcement is enabled.
4. Open `/writings`, a nested documentation page, and `/es/` directly.
5. Refresh each nested page and check for missing CSS, JavaScript, or images.
6. Test search, social sharing, feedback, and downloads.
7. Inspect a page's canonical URL and social metadata in its source.
8. Test an old `joseeden.github.io/joeden/` bookmark, including a nested page, and inspect its final destination.

For response headers, use:

```powershell
curl.exe -I https://joseeden.com/
curl.exe -I https://www.joseeden.com/
curl.exe -I http://joseeden.com/
curl.exe -IL https://joseeden.github.io/joeden/
```

Update profile links and any external service configuration that explicitly names the old domain. Check feedback and comment integrations for hostname restrictions or URL-based page identifiers.

## Troubleshooting

### Porkbun Parking Page Appears

1. Confirm the domain uses the DNS provider where the records were edited.
2. Check for old root A, AAAA, or ALIAS records.
3. Compare DNS results with the table above.
4. Allow caches to expire and retry in a private window.

### GitHub Returns a 404

1. Confirm the custom domain is saved on `joseeden/joeden`.
2. Confirm Pages uses GitHub Actions.
3. Confirm the latest deployment succeeded.
4. Open the root URL without `/joeden/`.

### The Page Has No Styling

1. Inspect failed requests in the browser's Network panel.
2. Check whether asset paths still begin with `/joeden/`.
3. Confirm the deployed commit contains `baseUrl: '/'`.
4. Rebuild and deploy the updated configuration.

### HTTPS Is Still Unavailable

1. Confirm both root and `www` DNS records are correct.
2. Remove conflicting records only for the affected website hosts.
3. Check the certificate message in GitHub Pages settings.
4. Allow certificate provisioning to finish before retrying enforcement.

### Search Is Empty or Uses the Old Domain

1. Confirm the crawler can fetch a live page over HTTPS.
2. Check URL patterns for the old `/joeden/` prefix.
3. Confirm the crawl completed and published to the frontend's index.
4. Inspect the indexed URL and language fields.
5. Check API responses for key restrictions or permission errors.

## Changing to Another Domain Later

1. Replace `joseeden.com` in the Docusaurus URL and explicit metadata.
2. Keep `baseUrl: '/'` if the new site still lives at the domain root.
3. Verify the new domain with GitHub and update the repository's Pages setting.
4. Configure DNS at the new domain's active DNS provider.
5. Deploy the new build and enable HTTPS.
6. Add the new domain in Algolia, update crawler URLs, and run a full crawl.
7. Arrange redirects from the old custom domain through a service that supports HTTPS and preserves paths. DNS records alone cannot perform URL redirects.
8. Repeat the validation steps before retiring the old address.

If returning to the original GitHub project address, use `url: 'https://joseeden.github.io'` and `baseUrl: '/joeden/'`. Coordinate that rebuild with removing the custom domain setting and updating DNS and Algolia.
