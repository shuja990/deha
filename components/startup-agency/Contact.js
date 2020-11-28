import React, { Component } from 'react';
import Link from 'next/link';

export class Contact extends Component {
    render() {
        return (
            <section className="contact-cta-area ptb-120">
                <div className="container">
                    <div className="contact-cta-content">
                        <div className="section-title">
                            <span>Get in Touch</span>
                            <h2>Want To Work With Us? Let's Talk About The Future of Community!</h2>
                        </div>

                        <Link href="/contact">
                            <a className="btn btn-primary">Contact Us</a>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default Contact;
