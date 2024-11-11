# CMPT-hyperlinker
A Google Chrome extension that highlights and hyperlinks any paragraph text that matches the 'CMPT XXX' format. The inserted link redirects to the course description for the current academic term on the SFU CS website. Hovering over the course code also displays a tooltip showing the title of the course (ie: "Data Structures and Algorithms").

This project helped me learn about JavaScript and DOM traversal.

A future version may include support for courses in other departments at SFU, and performance improvements. I would also like to add an "Options" page where the user can change the colour (or turn off) the highlighting for the hyperlinked text.

## Getting Started

After following installation steps (below), proceed to one of the following URLs to see the extension in action:
* https://www.reddit.com/r/simonfraser/comments/9c4exg/cmpt_courses_with_no_finals/
* http://www.sfu.ca/computing/current-students/undergraduate-students/programs/computing-science-major.html

### Notes

* The script can easily be modified to support any other department at SFU
* May cause minor browser lagging if used on Reddit
* Facebook is _not_ supported, as Facebook blocks attempts to inject scripts via its CSP

### Prerequisites

Google Chrome web browser

### Installing

To install:
1) Download remote to local
2) Navigate to chrome://extensions
3) Enable developer mode (top-right)
4) Select the "LOAD UNPACKED" option (top-left)
5) Specify the location of the downloaded repository
6) The extension will be added; ensure that the toggle switch is in the "on" position

## Built With

* JavaScript

## Authors

* **Kyle Moss**

## License

This project is licensed under the MIT License

## Acknowledgments

* Thanks to helpful posts on StackOverflow

## TODO 
* add support for courses in other departments (ie: MATH, PSYC, etc)
