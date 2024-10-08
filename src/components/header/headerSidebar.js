/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useStaticQuery, graphql , Link} from 'gatsby';
import Img from "gatsby-image";
import Scrollspy from 'react-scrollspy';
import {GatsbyImage} from 'gatsby-plugin-image'

// Start Header Area
const HeaderNoSidebar = () => {
    const headerQuerySidebar = useStaticQuery(graphql`
        query headerQuerySidebarQuery {
            allMenuJson {
                nodes {
                    title
                    path
                }
            },
            settings: markdownRemark(frontmatter: {id: {eq: "settings"}}) {
              frontmatter {
                site_logo {
                  childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 70, height: 35)
                  }
                }
              }
            }

            menu: markdownRemark(frontmatter: {id: {eq: "menu_items"}}) {
              frontmatter {
                item_1
                item_2
                item_3
                item_4
                item_5
              }
            }
        }
    `);

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const Logo = headerQuerySidebar.settings.frontmatter.site_logo.childImageSharp.gatsbyImageData;
    const Menu = headerQuerySidebar.menu.frontmatter


    useEffect(() => {
        if(!isOverlayOpen){
          document.querySelector('.trigger-popup-menu').classList.remove('overlay-wrapper-open');
          document.querySelector('.hambergur-menu').classList.remove('hambergur-menu-open');
        }
    });

    const onMenuToggleClick = () => {
        setIsOverlayOpen(prevState => !prevState)
        document.querySelector('.trigger-popup-menu').classList.toggle('overlay-wrapper-open');
        document.querySelector('.hambergur-menu').classList.toggle('hambergur-menu-open');
    };

    const [scroll, setScroll] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 10)
        })
    }, []);


    return (
        <Fragment>
            <header className={scroll ? "rn-header header-default header-transparent d-block d-xl-none scrolled" : "rn-header header-default header-transparent d-block d-xl-none"}>
                <div className="header-inner" sx={{color: "body_color", fontFamily: "body"}}>
                    {/* Header Logo  */}
                    <div className="header-left">
                        <div className="logo">
                            <Link to="/">
                                <GatsbyImage image={Logo}  />
                            </Link>
                        </div>
                    </div>
                    {/* Main Menu  */}
                    <div className="header-right" onClick={onMenuToggleClick}>
                        <div className="hambergur-menu">
                            <div className="hamburger-box">
                                <div className="hamburger-inner">

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Start Social Area  */}
                </div>
            </header>
            <div className="trigger-popup-menu">
                <div className="menu_full">
                    <div className="menu_wrapper">
                        <Scrollspy className="popup_mainmenu" items={['home','about', 'portfolio' , 'news' , 'contact']} currentClassName="is-current" offset={-200}>
                            <li>
                                <a className="menu-hover-link" href="/#home" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text={Menu.item_1}>{Menu.item_1}</span>
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a className="menu-hover-link" href="/#about" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text={Menu.item_2}>{Menu.item_2}</span>
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a className="menu-hover-link" href="/#portfolio" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text={Menu.item_3}>{Menu.item_3}</span>
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a className="menu-hover-link" href="/#news" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text={Menu.item_4}>{Menu.item_4}</span>
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a className="menu-hover-link" href="/#contact" onClick={onMenuToggleClick}>
                                    <span className="hover-item">
                                        <span data-text={Menu.item_5}>{Menu.item_5}</span>
                                    </span>
                                </a>
                            </li>
                        </Scrollspy>
                    </div>
                    <div className="trigger_closer" onClick={onMenuToggleClick}>
                        <span className="text">Close</span>
                        <span className="icon"></span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
// End Header Area

HeaderNoSidebar.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderNoSidebar.defaultProps = {
  siteTitle: ``,
}

export default HeaderNoSidebar;
