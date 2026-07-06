function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border py-6 text-center">
      <p className="text-xs font-label text-neutral">
        © {new Date().getFullYear()} masqueradeAI. All rights reserved. Powered by Google Gemini.
      </p>
    </footer>
  );
}

export default Footer;
