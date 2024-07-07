import React, {useState , useEffect} from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaSkype, FaVimeo } from "react-icons/fa";
import {useStaticQuery, graphql} from 'gatsby';


const Footer = ({showBelow}) => {
    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        }else {
            if (show) setShow(false)
        }
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    const handleClick = () => {
        window[`scrollTo`]({top: 0, behavior: `smooth`})
    }

    const footerQueryData = useStaticQuery (graphql`
        query FooterDefaultQuery {
          markdownRemark(frontmatter: {id: {eq: "footer"}}) {
            frontmatter {
              footer_title
              footer_address
              footer_email
              footer_number
              footer_fb_link
              footer_insta_link
            }
          }
        }
    `);

    const footerData = footerQueryData.markdownRemark.frontmatter
    return (
        <footer className="rn-footer-area bg-color-black pt--90 pb--60">
            <div className="footer-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt_md--30 mt_sm--30 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="0.1s">
                            <div className="ft-info">
                                <p>{footerData.footer_title}</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt_md--30 mt_sm--30 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="0.2s">
                            <div className="ft-info">
                                <p>{footerData.footer_address}</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt_md--30 mt_sm--30 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="0.4s">
                            <div className="ft-info">
                                <p>{footerData.footer_email}<br />{footerData.footer_number}</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt_md--30 mt_sm--30 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="0.6s">
                            <div className="ft-info">
                                <ul className="social-share">
                                    <li><a target="_blank" href={footerData.footer_fb_link}><FaFacebookF /></a></li>
                                    <li><a target="_blank" href={footerData.footer_insta_link}><FaInstagram /></a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="back-to-top">
                <div className="backtop" onClick={handleClick}>
                    <span className="top"></span>
                </div>
            </div>
        </footer>
    )
}
export default Footer
