export const ApplyPodcastDetailsTemplate = (html, colors) => `
    <html>
        <header>
            <style>
            body{
                color: ${colors.text};
                display:inline-block;
            } 
            div{
                padding:'15px 0 0 0';
                font-size: 44;
                background-color: ${colors.background};
            }
            /* unvisited link */
            a:link {
                color: ${colors.link};
            }
            /* visited link */
            a:visited {
                color: ${colors.link};
            }
            /* mouse over link */
            a:hover {
                color: ${colors.link};
            }
            /* selected link */
            a:active {
                color: ${colors.link};
            }
            </style>
        </header>
        <body>
            <div>
            `+ html +`
            </div>
        </body>
    </html>
`;

export const ApplyStoryTemplate = (html, colors) => `
    <html>
        <style>
            p {
                color: ${colors.primary}
            }
            #content {
                padding:'15px 0 0 0';
                font-size: 54;
                font-family: Futura-Medium;
                text-align: center;
                text-justify: inter-word;
            }
        </style>
        <body>
            <div id="content">
            `+ html +`
            </div>
        </body>
    </html>
`
export const ApplyArticleTemplate = (html, colors) => `
    <html>
    <header>
        <style>
            body {
                padding:'15px 10px 10px 50px';
            }
            p {
                color: ${colors.text};
            }
            #content {
                font-size: 44;
                font-family: Futura-Medium;
                text-align: justify;
                text-justify: inter-word;
                color: 'red';
            }
            #contentBody {
                color: ${colors.text};
            }
            #author {
                color: ${colors.highlight};
                font-size: 30;
                font-weight: bold;
            }
            #date {
                color: ${colors.secondary};
                font-size: 30;
                font-weight: bold;
                margin: 0 0 20px 0;
            }
            #author>span {
                color: ${colors.secondary}!important;
            }
        </style>
    </header>
    <body>
        <div id="content">
            `+ html +`
        </div>
    </body>
    </html>
`