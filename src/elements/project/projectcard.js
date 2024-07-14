/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react';
import {Link} from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { slugify } from "../../utils/utilityFunctions";




const Projectcard = ({image, id, title, category, column}) => {
     let projectImg = <GatsbyImage image={image.gatsbyImageData} /> ;
    // if(image.fixed && typeof image.fixed !== 'function'){
    //     projectImg = <Img fixed={image.fixed} alt={title}/>;
    // } else if(image.fluid){
    //     projectImg = <Image fluid={image.fluid} alt={title}/>
    // } else{
    //     projectImg = <img src={image.src} alt={title}/>
    // }

    return (
        <div className={column}>
            <div className="portfolio">
                <div className="thumbnail">
                    <Link to={`/project/${slugify(title)}`}>
                        {projectImg}
                    </Link>
                </div>
                <div className="content" sx={{color: "headings_color", fontFamily:"heading"}}>
                    <div className="inner">
                        {title && <h4 className="title"><Link to={`/project/${slugify(title)}`}>{title}</Link></h4>}
                        {category && <span className="category"><a href="#category">{category}</a></span>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Projectcard;
