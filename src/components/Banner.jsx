import React from 'react'
import {bannerStyles,customStyles} from '../assets/dummyStyles'
import {floatingIcons} from '../assets/dummyBanner'
import { Sparkle } from 'lucide-react'
const Banner = () => {
  return (
    <div className={bannerStyles.container}>
        <div className={bannerStyles.floatingIconsWrapper}>
        {floatingIcons.map((icon, i) => (
          <img
            key={i}
            src={icon.src}
            alt={icon.alt || ""}
            className={`${bannerStyles.floatingIcon} ${icon.pos}`}
            style={{
              animationDelay: `${i * 0.35}s`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>
      <div className={bannerStyles.mainContent}>
        <div className={bannerStyles.grid}>
            <div className={bannerStyles.leftContent}>
                <span className={bannerStyles.badge}>
                     <Sparkle className={bannerStyles.badgeIcon}/>
                        New Features Available






                        
                </span>

            </div>

        </div>

      </div>
      
    </div>
  )
}

export default Banner
