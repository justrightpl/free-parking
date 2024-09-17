# free-parking

`free-parking` is a lightweight, free, open-source Next.js/React/Tailwind template for quickly spinning up "domain for sale" landing pages, cutting out the need for services like Afternic. Created by [@baileysimrell](https://github.com/baileysimrelll) of [@justrightpl](https://justright.pl).

![Free Parking App Screenshot](https://cdn.prod.website-files.com/60ca4a4b1629ce06182a97e6/66e78d7e3afa2e6d06b47406_freeparking.vercel.app_.png)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and enhanced with custom components and styling.

## Features

- Responsive design using [Tailwind CSS](https://tailwindcss.com)
- Customizable site content via `config/site.ts`
- Contact form with email notifications using [Resend](https://resend.com) and [react.email](https://react.email)
- Easy deployment on [Vercel](https://vercel.com)

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
or
yarn install
or
pnpm install
```

3. Set up environment variables:
    
    Create a `.env.local` file in the root directory and add the following:

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_DOMAIN=your_resend_domain
```

4. Customize the site configuration:
   
   Edit the `config/site.ts` file to update your domain information and other settings.

5. Run the development server:

``` bash
npm run dev
or
yarn dev
or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

- Update the site configuration in `config/site.ts`
- Modify the main page layout in `app/page.tsx`
- Customize components in the `components` directory
- Adjust styles in `styles/globals.css` and individual component files

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Make sure to set up the required environment variables in your Vercel project settings.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Resend Documentation](https://resend.com/docs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help with setup, please open an issue in the GitHub repository.
