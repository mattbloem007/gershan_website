/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState, useEffect, Fragment } from "react"
import PropTypes from "prop-types";
import {useStaticQuery, graphql , Link} from 'gatsby';
import Img from "gatsby-image";
import Scrollspy from 'react-scrollspy';
import {GatsbyImage} from 'gatsby-plugin-image'

// Start Header Area
const Header = () => {


    const headerQuery = useStaticQuery(graphql`
        query headerQuery {
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

    const [scroll, setScroll] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 10)
        })
    }, [])

    const Logo = headerQuery.settings.frontmatter.site_logo.childImageSharp.gatsbyImageData;
    const Menu = headerQuery.menu.frontmatter

    return (
        <Fragment>
            <header className={scroll ? "rn-header header-default header-transparent scrolled d-none d-xl-block" : "rn-header header-default header-transparent d-none d-xl-block"}>
                <div className="header-inner">
                    <div className="container">
                        <div className="row align-items-center" sx={{color: "body_color", fontFamily: "body"}}>

                            {/* Start Header Left  */}
                            <div className="col-lg-3">
                                <div className="header-left">
                                    <div className="logo">
                                        <Link to="/">
                                            <GatsbyImage image={Logo}  />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* End Header Left  */}

                            {/* Start Mainmenu Area  */}
                            <div className="col-lg-9">
                                <div className="menu_wrapper">
                                    <Scrollspy className="mainmenuwrapper" items={['home','about', 'portfolio',  'news' , 'contact']} currentClassName="is-current" offset={-200}>
                                        <li>
                                            <a className="menu-hover-link" href="/#home">
                                                <span className="hover-item">
                                                    <span data-text={Menu.item_1}>{Menu.item_1}</span>
                                                </span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="menu-hover-link" href="/#about">
                                                <span className="hover-item">
                                                    <span data-text={Menu.item_2}>{Menu.item_2}</span>
                                                </span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="menu-hover-link" href="/#portfolio">
                                                <span className="hover-item">
                                                    <span data-text={Menu.item_3}>{Menu.item_3}</span>
                                                </span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="menu-hover-link" href="/#news">
                                                <span className="hover-item">
                                                    <span data-text={Menu.item_4}>{Menu.item_4}</span>
                                                </span>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="menu-hover-link" href="/#contact">
                                                <span className="hover-item">
                                                    <span data-text={Menu.item_5}>{Menu.item_5}</span>
                                                </span>
                                            </a>
                                        </li>

                                    </Scrollspy>
                                </div>
                            </div>
                            {/* End Mainmenu Area  */}
                        </div>
                    </div>




                </div>
            </header>

        </Fragment>
    )
}
// End Header Area

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;
