export default ({ env }) => ({
  upload: {
    config: {
      provider: "@strapi/provider-upload-cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
      breakpoints: false,
    },
  },
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d', // Change this as needed
      },
      jwtSecret: env('JWT_SECRET', 'your-random-secret-key'),
    },
  },
});
