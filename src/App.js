import React, { useEffect } from 'react';
import './App.css';

const App = () => {
  useEffect(() => {
    const setStyle = (element, cssProperty) => {
      for (let property in cssProperty) {
        element.style[property] = cssProperty[property];
      }
    };

    const destroySticky = (element) => {
      setStyle(element, {
        top: '',
        left: '',
        bottom: '',
        width: '',
        position: '',
      });
    };

    const getOffset = (el) => {
      el = el.getBoundingClientRect();
      return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY,
      };
    };

    const simpleStickySidebar = (element, options) => {
      // Global options
      const sticky = document.querySelector(element); // Sticky sidebar
      const container = document.querySelector(options.container); // Sticky sidebar container
      const topSpace = options.topSpace ? options.topSpace : 0; // Top spacing after sticky
      const bottomSpace = options.bottomSpace ? options.bottomSpace : 0; // Bottom spacing after sticky

      // vars
      const $window = window; // window
      const stickyHeight = sticky.getBoundingClientRect().height; // Sticky sidebar height
      const stickyOffsetTop = getOffset(sticky).top; // Sticky sidebar top offset
      const stickyOffsetBottom =
        getOffset(sticky).top + sticky.getBoundingClientRect().height; // Sticky sidebar bottom offset
      const stickyOffsetLeft = getOffset(sticky).left; // Sticky sidebar left offset
      let topFixed = false; // checkpoint
      let bottomFixed = false; // checkpoint
      let lastScrollVal = 0; // checkpoint

      const getStickyHeight = () => {
        return document.querySelector(element).getBoundingClientRect().height;
      };

      // scrolling
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        // when scroll position touches the "Sidebar"
        if (scrollTop > stickyOffsetTop - topSpace) {
          // if "Sidebar" is smaller than the viewport
          if (getStickyHeight() <= $window.innerHeight - topSpace) {
            // fix "Sidebar" from top
            setStyle(sticky, {
              top: topSpace + 'px',
              left: stickyOffsetLeft + 'px',
              bottom: '',
              width: sticky.getBoundingClientRect().width + 'px',
              position: 'fixed',
            });
          } else {
            // scrolling down
            if (scrollTop > lastScrollVal) {
              // if "Sidebar" fixed from top during scrolling down
              if (topFixed) {
                // get new offset of "Sidebar"
                const absoluteStickyOffsetTop = getOffset(sticky).top;

                setStyle(sticky, {
                  top: absoluteStickyOffsetTop - getOffset(container).top + 'px',
                  left: '',
                  bottom: '',
                  width: '',
                  position: 'absolute',
                });
                topFixed = false;
              }
              // make "Sidebar" fixed from bottom when bottom area is visible in viewport
              if (scrollTop > stickyOffsetBottom - $window.innerHeight) {
                setStyle(sticky, {
                  top: '',
                  left: stickyOffsetLeft + 'px',
                  bottom: bottomSpace + 'px',
                  width: sticky.getBoundingClientRect().width + 'px',
                  position
                  : 'fixed',
                });
                bottomFixed = true;
              }
            } else {
              // scrolling up
              // get new offset of "Sidebar" during scrolling up
              const absoluteStickyOffsetTop = getOffset(sticky).top;
              // if "Sidebar" fixed from bottom, stop sticky to its position
              if (bottomFixed) {
                setStyle(sticky, {
                  top: absoluteStickyOffsetTop - getOffset(container).top + 'px',
                  left: '',
                  bottom: '',
                  width: '',
                  position: 'absolute',
                });
                bottomFixed = false;
              }
              // make "Sidebar" fixed from top when top area is visible in viewport
              if (scrollTop < absoluteStickyOffsetTop - topSpace) {
                setStyle(sticky, {
                  top: topSpace + 'px',
                  left: stickyOffsetLeft + 'px',
                  bottom: '',
                  width: sticky.getBoundingClientRect().width + 'px',
                  position: 'fixed',
                });
                topFixed = true;
              }
            }
            lastScrollVal = scrollTop;
          }
        } else {
          // make sidebar return to its default position
          destroySticky(sticky);
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };

    simpleStickySidebar('.sidebar-inner', {
      container: '.sidebar',
      topSpace: document.querySelector('.main-header').getBoundingClientRect().height + 20,
      bottomSpace: 20,
    });
  }, []);

  return (
    <div className="container">
      <header className="main-header">
        <div className="container">
          <h3>Simple Sticky Sidebar</h3>
        </div>
      </header>
      <div className="area">
        <h1>Simple Sticky Sidebar</h1>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <div className="sidebar">
            <div className="sidebar-inner">
              <div className="text">Sidebar Content</div>
              <div className="text">Sidebar Content</div>
              <div className="text">Sidebar Content</div>
              <div className="text">Sidebar Content</div>
              <div className="text">Sidebar Content</div>
              <div className="text">Sidebar Content</div>
              <div className="text">Sidebar Content</div>
              <div className="text">Sidebar Content</div>
              <div className="text">Sidebar Content</div>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="search-content">
            <div className="content">
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">content</div>
              <div className="text">
              content
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
