export default function Footer() {
  return (
    <footer className="w-full">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-10" style={{ backgroundColor: "#1A1F3B", color: "#E2E8F0" }}>
        <div>
          <h2 className="text-xl font-bold mb-4">About AlumniVerse</h2>
          <p className="text-sm">
            AlumniVerse is a centralized platform connecting alumni with current students, offering networking, webinars, donations, and professional growth opportunities.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/alumni" className="hover:text-blue-400">Alumni</a></li>
            <li><a href="/features" className="hover:text-blue-400">Features</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
          <p className="text-sm mb-2">Email: support@alumniverse.com</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">LinkedIn</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-blue-400">Facebook</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 text-white" style={{ backgroundColor: "#0F111A" }}>
        © 2025 AlumniVerse. All rights reserved.
      </div>
    </footer>
  );
}
