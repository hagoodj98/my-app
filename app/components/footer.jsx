import React, {Fragment} from "react";
import { Work_Sans } from "next/font/google";

const worksans =  Work_Sans({
    subsets:['latin'],
    display: 'swap',
  })
  

function Footer(){
    return (
    <div className="container">
        <footer className="py-3 my-4">
            <p className="text-center"><span className={worksans.className}>&copy; Jaiqez's Blog. All right reversed</span></p>
            <p className="text-center text-body-secondary"><span className={worksans.className}>@ All book information comes from the <a href=""> Open Library API.</a></span></p>
        </footer>
    </div>
    )

}

export default Footer;