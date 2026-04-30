export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-dark text-background dark:text-dark py-8 mt-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div>
          <h2 className="text-2xl font-bold text-background">Lina's Finds</h2>
          <p className="text-secondary mt-2 text-sm">
            The best e-commerce platform in Mila, built with React & Tailwind v4.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 text-background">Quick Links</h3>
          <ul className="text-secondary text-sm space-y-1">
            <li className="hover:text-primary cursor-pointer">Home</li>
            <li className="hover:text-primary cursor-pointer">Cart</li>
            <li className="hover:text-primary cursor-pointer">Admin Login</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 text-background">Contact Us</h3>
          <p className="text-secondary text-sm">Email: contact@linasfinds.dz</p>
          <p className="text-secondary text-sm">Phone: +213 795012396</p>
        </div>

      </div>

      <div className="border-t border-secondary mt-8 pt-4 text-center text-textDark text-xs">
        © 2026 University of Mila - Master STIC. All rights reserved.
      </div>
    </footer>
  );
}