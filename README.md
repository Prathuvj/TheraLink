# TheraLink - Mental Health Support Platform

TheraLink is a comprehensive mental health support platform that connects users with resources, AI-powered chat support, and licensed therapists.

## Features

- 🧠 AI-powered chat support for immediate assistance
- 📚 Curated mental health resources and articles
- 👥 Connect with licensed therapists
- 🔒 Secure user authentication
- 📱 Responsive design for all devices
- 🌐 Community discussion forums
- 📊 Mental health assessments
- 🔔 Customizable notifications

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Supabase (Authentication & Database)
- Google's Gemini AI
- Vite
- React Router
- Lucide Icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with the following:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Setup

Make sure you have the following environment variables configured:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_GEMINI_API_KEY`: Your Google Gemini API key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.