function renderFooter() {
    const footer = document.getElementById("footer");

    if (!footer) {
        console.error("Footer element with ID 'footer' not found. Cannot render footer.");
        return;
    }

    footer.innerHTML = `
        <!-- Create the Footer Wrapper -->
        <footer class="footer">
            <!-- Create the Footer Container -->
            <div class="footer-container">
                <!-- Add the Hospital Logo and Copyright Info -->
                <div class="footer-logo">
                    <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo">
                    <p>© Copyright 2025. All Rights Reserved by Hospital CMS.</p>
                </div>
                <!-- Create the Links Section -->
                <div class="footer-links">
                    <!-- Add the 'Company' Links Column -->
                    <div class="footer-column">
                        <h4>Company</h4>
                        <a href="#">About</a>
                        <a href="#">Careers</a>
                        <a href="#">Press</a>
                    </div>
                    <!-- Add the 'Support' Links Column -->
                    <div class="footer-column">
                        <h4>Support</h4>
                        <a href="#">Account</a>
                        <a href="#">Help Center</a>
                        <a href="#">Contact Us</a>
                    </div>
                    <!-- Add the 'Legals' Links Column -->
                    <div class="footer-column">
                        <h4>Legals</h4>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Licensing</a>
                    </div>
                </div>
            </div> <!-- End of footer-container -->
        </footer> <!-- End of footer element -->
    `;
}

renderFooter();
