export default `<style>

#top-header {
	background-color: #fff !important;
	padding: 10px 0 0 0;
}

#main-header {
	background: #fff !important;
}

.et_fullwidth_nav #main-header .container {
	padding: 0;
}

#main-header .logo {
	/*background: none;
	position: relative;
	top:-3em;*/
}
#tag-title-line {
	/*width:80%;
	position: relative;
	top: 8.5em;
	*/
	display:none;
}
.tag-title {
	background-color: none;
	color: #7c7c7b;
	font-size: 1.2em;
	font-weight: normal;
	font-family: "PT Sans", sans-serif;
	padding-top: .5em;
	padding-bottom: 2.1em;
	text-align: left;
	z-index: -100;
}

.centered #et-navigation {
	padding-top: 3em;
	width: 100%;
}

body {
	background: #fff !important;
	color: #4B5867;
}

.wp-caption p.wp-caption-text {
	font-style: italic !important;
}

blockquote{
	border-left:0;
	display:block;
	margin:0 auto;
	padding-top:30px;
	padding-bottom:30px;
	border-top:1px solid;
	border-bottom:1px solid;
	margin-bottom:30px;
	text-align:center;
	font-style:italic;
	font-weight: normal !important;
	text-transform: none !important;
	font-size: 1.2em;	
}

#et-menu li > ul {
	background: #fff !important;
}

#et-menu > li > ul, #et-menu li > ul, #et-menu > li > ul > li > ul, .et-top-search-primary-menu-item .et-top-search, .et_pb_module, .module, .page article, .authors-page .page, #timeline-sticky-header, .et_extra_other_module, .woocommerce .woocommerce-info {
	border: none !important;
}

#et-navigation > ul > li > a:before {
	display: none;
}

#et-navigation > ul > li > a {
	padding: 0 0 10px;
}


li.voce_home {
	background: #0066cc !important;
}

li.voce_archivio {
	background: #009de0 !important;
}

li.voce_ultimo {
	background: #009ab2 !important;
}

li.voce_precedenti {
	background: #f29200 !important;
}

li.voce_sfogliabili {
	background: #e3001b !important;
}

li.voce_pdf {
	background: #b7007d !important;
}

li.voce_abbonamenti {
	background: #800057 !important;
}
li.voce_ricerca {
	background: #f12961 !important;
}

/* menu NRU */

li.nru_1 {
	background: #fff04f !important;
}

li.nru_2 {
	background: #d8dc54 !important;
}

li.nru_3 {
	background: #a8c859 !important;
}

li.nrnewsletter{
	background: #ff6600 !important;
}


/*SIDEBAR */

.et_extra_layout .et_pb_column_sidebar, .et_pb_extra_column_sidebar {
	width: 90%;
	max-width: 90%;
	min-width: 22%;
	-webkit-flex-basis:22%;
	-ms-flex-preferred-size:22%;
	flex-basis:22%;
}

.with_sidebar .et_extra_layout .et_pb_column_main, .with_sidebar .et_pb_extra_column_main {
	padding: 0 2em 0 0 !important;
}

.et_extra_layout .et_pb_column_sidebar, .et_pb_extra_column_sidebar {
	background: #eceaeb;
	padding: 0 !important;
}

.et_pb_widget {
	background: #eceaeb;
	border: none !important;
	box-shadow: none !important;
}

.et_pb_widget .widgettitle {
	background: none !important;
	color: #000 !important;
}


.et_pb_widget a {
	font-weight: normal !important;
	color: #000 !important;
	font-size: 0.8em !important;
}

.et_pb_widget li, .et_pb_widget.woocommerce .product_list_widget li {
	font-size: 1em;
}

.input, .textarea, input, input[type="email"], input[type="password"], input[type="search"], input[type="text"], select, textarea {
	font-size: 0.8em;
}

.et_pb_widget.widget_et_login .button, .et_pb_widget.widget_et_login .post-nav .nav-links .button, .et_pb_widget.widget_et_login .read-more-button {
	font-size: 0.8em;
}



/* WIDGETS */

#custom_html-3 h4 {
	padding: 0 20px;
}

#custom_html-3.textwidget {
	
}

#loginform .before_text {
	font-size: 0.8em;
}

#loginform .input, #loginform .textarea, #loginform input, #loginform input[type="email"], #loginform input[type="password"] {
	font-size: 0.7em;
}

#loginform .widget_list .et_pb_widget li {
	padding: 10px 15px !important;
}

#loginform .after_text {
	font-size: 0.8em;
}

#loginform .after_text a{
	font-size: 1.1em !important;
}

#loginform .button {
	font-size: 0.8em;
}


ul.widget_list {
	list-style-type: none !important;
}

.et_pb_widget li {
	border-bottom: 1px solid #ccc;
	padding: 5px 15px;
	margin: 0;
}

#issuem_active_issue_with_desc-2.et_pb_widget {
	margin-bottom: 0 !important;	
}

#issuem_article_per_category_list-2.et_pb_widget .widgettitle {
	padding-top: 0 !important;
}

divissuem_article_per_category_list-2.et_pb_widget issuem_article_list {
	margin-bottom: 0 !important;
}

.et_pb_widget .widgettitle {
	text-transform: uppercase !important;
}

.et_pb_extra_column_sidebar .et_pb_widget .widgettitle {
	padding: 15px;
}
.et_pb_extra_column_sidebar #custom_html-8 {
    margin-bottom: 0;
}

.et_pb_widget.widget_text .textwidget {
	padding: 20px 15px !important;
}

/* PAGE */

.page article, .single article {
	box-shadow: none !important;
}

.et_pb_text_inner {
	padding-left: 0 !important;
	padding-right: 0 !important;
}

.page .post-wrap .post-content, .single .post-wrap .post-content {
	margin-top: 0 !important;
}


/* HOMEPAGE */

#home .et_pb_slide {
	padding-right: 0 !important;
	padding-bottom: 0 !important;
	padding-top: 0 !important;
}

#home .et_pb_slides .et_pb_slider_container_inner {
	vertical-align: top !important;
}

#issuem_active_issue-2 {
	width: 100%;
}

.issuem_widget_issue_cover_image img {
	border: 1px solid #ccc;	
}

.issuem_active_list_widget, .issuem_article_list_widget {
	text-align: left;
	margin-left: 15px;
}

.page .et_pb_row, .single .et_pb_row {
	width: 100%
}

.et_pb_row {
	padding: 0;
}

.page-id-141 div .issuem_title {
	text-align: right !important;
}

.page-id-141 div .issuem_description {
	text-align: right !important;
	font-weight: normal !important;
	font-size: 1.2em;
}

div .issuem_description {
	text-align: left;
	font-weight: normal !important;
	font-size: 1.2em;
}


.page-id-141 .page .post-wrap h1 {
	display: none !important;
}

.page-id-141 .page article {
	border: none !important;
	border-top-width: 0px !important;
	border-color: none !important;
}

.page-id-141 .et_pb_section, .et_pb_slider .et_pb_slide {
	vertical-align: top !important;
}

.page-id-141 .et_pb_slides .et_pb_slider_container_inner {
	vertical-align: top !important;
}

.post-header {
	padding: 30px 30px 5px 30px !important;
}

/*.post-wrap h1 {
	font-size: 26px !important;
}*/

.page .post-wrap .post-content, .single .post-wrap .post-content {
	margin-top: 5px;
}

h3, h4, h5, h6 {
	text-transform: none !important;
}

.et_pb_gutters3 .et_pb_column_1_2 .et_pb_widget {
	width: 100% !important;
}

div#issuem_active_issue-3 {
	box-shadow: none !important;
}

.issuem_article_list_widget .issuem_widget_category {
	color: #000;
    text-align: left;
    font-size: 16px !important;
    text-transform: none;
    letter-spacing: normal;
}



/* SEARCH & FILTER */

.searchandfilter input[type="text"] {
	width: 100% !important;
}

.searchandfilter li {
	padding-right: 5em !important;
}

/*#custom_html-8, #custom_html-9 {
	box-shadow: none !important;
	margin-bottom: 0 !important;
	font-size: 1.5em !important;
	background: #fc3
}*/

#custom_html-8.et_pb_widget .widgettitle, #custom_html-9.et_pb_widget .widgettitle {
	display: none !important;
}


/* ISSUEM */

p.issuem_widget_issue_name, p.issuem_widget_issue_name a {
	font-weight: bold !important;
	font-size: 30px !important;
}

.issuem_current_issue_page {
}
.issuem_current_issue_page img {
	display: inline;
	float: left;
	clear: both;
	margin: 10px 20px 0 0;
	max-width: 150px;
}
.issuem_articles_shortcode {
    margin-top: 30px;
}
.issuem_articles_shortcode .issuem_article {
	padding-bottom: 10px;
}

.issuem_articles_shortcode p {
	text-align: left;
}

.issuem_articles_shortcode .issuem_article_category {
	color: #706f6f;
	font-size: 1em;
	text-transform: uppercase;
	font-family: "PT Sans", sans-serif;
	font-weight: bold;
	border-top: 1px solid #000;
	padding-top: 30px;
	padding-bottom: 10px;
}

.issuem_articles_shortcode .issuem_article_link {
	font-size: 2em;
	font-weight: normal;
	text-transform: normal;
	color: #000 !important;
}

.issuem_articles_shortcode .issuem_article_teaser {
	color: #020202;
	font-size: 1em;
	font-weight: normal;
}

.issuem_articles_shortcode .issuem_article_content {
	padding-top: 0;
	color: #706f6f;
}


.issuem_article_content img {
	display: inline;
	float: left;
	clear: both;
	margin: 10px 20px 0 0;
	vertical-align: middle !important;
}

/* POST */

div.post-category {
	color: #3E8498;
	padding: 0.8em 0;
	text-transform: uppercase;
	font-size: 1em;
	font-weight: 500;	
}

div.post-teaser {
	padding-bottom: 2em;
	padding-left: 0;
    color: #777;
}

div .issuem_title {
	font-size: 4em !important;
	font-weight: bold !important;
	line-height: 1em;
	text-align: left;
}

.post-footer .rating-stars, .post-footer .social-icons {
	display: none !important;
}

.post-footer {
	display: none !important;
}

.post-nav {
	display: none !important;
}

.et_pb_text_inner {
	padding-left: 3em;
	padding-right: 3em;
}

/* ISSUEM ARCHIVE */

.issuem_archive {
	text-align: left;
}

.featured_archives_cover img {
	border: 1px solid #ccc;	
	box-shadow: 0px 2px 10px #ccc;
	transition: .5s;
	width:100%;
}

.featured_archives_cover:hover img {
	box-shadow:none;
}
/* DOWNLOAD MANAGER - PDF DOWNLOAD CATEGORY PAGE*/

.w3eden img {
	border: 1px solid #ccc;
}

.w3eden .media-body {
	display: none;
}

.w3eden .panel-body {
	text-align: center;
	color: #222222 !important;
}

.w3eden .panel, .w3eden .panel-footer {
	border: none !important;
}


/** VDTZ **/
.et_pb_widget .issuem_widget_issue_name a {
	line-height: inherit;
}
.issuem_widget_issue_name a .description,
.issuem_archive a .description {
    font-size: 14px;
    display: inline-block;
	font-weight: 600;
	float: right;
	text-transform:uppercase;
	color: #000;
}
.post-content .issuem_widget_issue_name a {
	font-weight: bold;
}
.post-content .issuem_widget_issue_name a .description {
	display: inline-block;
	font-weight: 400;
	float: none;
}
.post-content .issuem_widget_issue_name a .description:before {
	padding-left: 0.5rem;
	content: '-';
	padding-right: 0.5rem;
}

/*.issuem_archive {
	min-height: 540px;
}
*/
.article_list:last-child{
	margin-bottom: 20px;
}

.sgi-error {
    background: darkred;
    color: white;
	padding: 7px;
}

.sgi-success {
    background: green;
    color: white;
    padding: 7px;
}

.issuem_active_list_widget, .issuem_article_list_widget {
    margin-right: 15px;
}

/* FLIP BOOK */

table, table td, table th, table tr  {
	border: none;
}

.book-thumbnail img {
	border: 1px solid #ccc;
}

/* DIVI OVERLAY */
.overlay-container {
	position: fixed;
	width: 100%;
	height: auto;
	top: 20% !important;
}


.overlay-container .overlay-close {
	font-size: 3em !important;
	position: relative;
	float: right;
}

/* CODICE VS */
.et_pb_widget a:hover {
    color: #3E8498 !important;
}
.et_pb_extra_column_sidebar .et_pb_custom_button_icon:after, .et_pb_extra_column_sidebar .et_pb_custom_button_icon:hover:after,
body #page-container .et_pb_section .login-search .et_pb_custom_button_icon:after, body #page-container .et_pb_section .login-search .et_pb_custom_button_icon:hover:after {
    font-size: 20px;
    display: inline-block;
    padding: 10px 0 0 10px;
	opacity:1;
    border-left: 1px solid #999;
	position: absolute;
    top: 0;
    bottom: 0;
	right: 10px;
}
.et_pb_extra_column_sidebar .et_pb_custom_button_icon, .et_pb_extra_column_sidebar .et_pb_custom_button_icon:hover,
body #page-container .et_pb_section .login-search .et_pb_custom_button_icon, body #page-container .et_pb_section .login-search .et_pb_custom_button_icon:hover {
	padding: 10px 51px 10px 10px;
    border: 1px solid #999;
	border-radius:0;
	width: 100%;
	text-align:left;
	text-transform: lowercase;
}
body #page-container .et_pb_section .login-search .et_pb_custom_button_icon {
	background-color: transparent;
}
body #page-container .et_pb_section .login-search .et_pb_custom_button_icon:hover {
	background-color: #e4e4e4;
}
li.login-menu {
    	background: #fef165;
	}
li.login-menu a {
	color: #000 !important;
}
li.login-menu:after {
	color: #000 !important;
	content: "\e08a";
    display: inline-block;
	border: 1px solid #000;
    border-radius: 50px;
    padding: 1px;
	font-family: "ETmodules";
	position: absolute;
    right: 9px;
    top: 14px;
}
.sgi-login input {
		border-radius: 0;
		width: 100%;
	}
#loginform .button, .sgi-login .button {
    background: #fef165;
    color: #000;
    border-radius: 0;
    display: block;
    width: 100%;
	position:relative;
}
.sgi-login .button {
	font-weight: 600 !important;
	margin-top:20px;
	font-size: 16px !important;
	text-align:center;
}
#loginform .button:after {
    content: "\e08a";
    display: inline-block;
    position: absolute;
    right: 9px;
    font-family: "ETmodules";
    top: 8px;
    border: 1px solid #000;
    border-radius: 50px;
    padding: 3px;
}

.login-search {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.login-search .et_pb_widget {
    margin: 0 20px 0 0;
    width: 50%;
    flex-basis: 100%;
}
.login-search  #custom_html-9 {
	background-color: #eceaeb;
}
.et_pb_widget .issuem_widget_issue_cover_image img {
    width: 100%;
}
.et_pb_widget {
	border-radius:0;
}
.container {
	width: 96%;
}

#content-area .et_pb_extra_column_main, #content-area .et_pb_extra_column_sidebar {
	min-width: auto !important;
	flex-basis:100% !important;
	padding: 0 !important;
}

.et_pb_section_0 .n2-ss-slider .n2-ss-section-main-content {
    background-blend-mode: multiply;
    background-color: #fbfbfb !important;
}
.sgi-login .widget_list {
    padding: 10px 0;
}
.sgi-login li {
	padding-left: 0 !important;
	padding-right: 0 !important;
}
.sgi-login #loginform .input {
	width: 100%;
}

.et_pb_widget .btn-abbonati {
	display: block;
    width: 100%;
    padding: 10px 12px;
    background: #B7007D;
    color: #fff !important;
    font-size: 16px !important;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold !important;
    transition: .5s;
}
#custom_html-11 h4, #custom_html-12 h4 {
    display: none;
}
.et_pb_widget .btn-abbonati:hover {
	color: #fff !important;
	background: #B7007DAA;
}
.et_pb_widget p, .et_pb_widget a {
    font-size: 13px !important;
    margin-top: 10px;
    line-height: 140% !important;
}
#custom_html-12 .textwidget.custom-html-widget, 
#custom_html-11 .textwidget.custom-html-widget,
#custom_html-13 .textwidget.custom-html-widget {
    padding-top: 0 !important;
}
div#nav_menu-5 {
    background: #01A3BE; 
	padding: 0 15px 15px;
}
#nav_menu-5 h4 {
	padding:12px 0;
	color:#fff !important;
}
#nav_menu-5 a {
	color:#fff !important;
}
#nav_menu-5 a:hover {
	color:#ffffffbb !important;
}
#nav_menu-5 li {
	border-color:#fff;
	padding: 5px 0;
}
#nav_menu-4 a:hover {
	color: #555 !important;
}
#nav_menu-4 li {
	border-color:#000;
}
/* Pagina Numeri precedenti*/
#post-239 .post-wrap, .page .post-wrap, .post-wrap {
    padding: 0;
}
.issuem_archives_shortcode {
	display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
}
.issuem_archive {
    display: flex;
    flex-basis: calc(33% - 10px);
    margin-right: 10px;
    margin-bottom: 10px;
    margin-left: 0;
	background: #f9f9f9;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 0;
}

.issuem_archive p {
	width:100%;
}
.issuem_archive a.numero-nr {
	border-bottom: 1px solid #ccc;
    display: block;
    padding-bottom: 10px;
	font-size:20px;
	font-weight:bold;
	color:#000;
}
.issuem_archive a.pdf-download, .issuem_archive a.full-size {
	font-size: 11px !important;
    text-transform: uppercase;
    display: inline-block;
    width: calc(50% - 4px);
    height: auto;
    box-sizing: border-box;
    margin: 13px 2px;
    background: #fefefe;
    color: #f29200;
    padding: 25px 10px;
    text-align: center;
	box-shadow: 0px 0px 20px #e6e6e6;
	border: 1px solid #ececec;
	transition: .5s;
}
.issuem_archive .pdf-download:hover, .issuem_archive a.full-size:hover {
	box-shadow: none;
}
.issuem_archive i {
	font-size: 28px;
    display: block;
	color: #f29200;
}
.issuem_archive .full-size .alert-danger {
    display: none;
}
.archive_by_year_main {
	display:none;
}
.et_pb_extra_column_sidebar .anno-pubblicazione li, .archive_by_year_main .anno-pubblicazione li {
	display: inline-block;
    background: #f29200;
    padding: 0;
    margin: 1px !important;
    width: calc(25% - 2px);
    box-sizing: border-box;
    text-align: center;
    border: 0;
	transition: .5s;
}
.et_pb_extra_column_sidebar .anno-pubblicazione li:hover, .archive_by_year_main .anno-pubblicazione li:hover {
	background: #f29200aa;
}
.et_pb_extra_column_sidebar .anno-pubblicazione li a, .archive_by_year_main .anno-pubblicazione li a{
	color: #fff !important;
	font-size:14px !important;
}
h4.tutti-numeri {
    text-transform: uppercase !important;
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 15px;
    color: #000;
}
.anno-pubblicazione li a {
    padding: 15px 10px;
    display: block;
    margin: 0;
	font-weight:bold !important;
}
.anno-pubblicazione li.active { 
	background: #f29200;
}
.anno-pubblicazione li.active a {  
	color: #fff !important;	
}
.next_previous_archive_pagination {
    border-top: 1px solid #ececec;
    padding-top: 10px;
    text-transform: uppercase;
    margin-top: 10px;
}
.sgi-login {
    margin-top: -25px;
}
/* Pagina Archivio*/

ul.tbp-menu-archivio {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    position: relative;
    padding: 0;
	margin-bottom:30px;
}
.tbp-menu-archivio li {
    margin: 1px;
    list-style: none;
    flex-basis: 280px;
    display: flex;
    box-sizing: border-box;
    flex-grow: 1;
}
.tbp-menu-archivio li a {
    padding: 10px;
    background: #f9f9f9;
    display: inline-block;
    width: 100%;
    font-size: 14px;
	transition: .2s;
}
.tbp-menu-archivio li a:hover, .tbp-menu-archivio .current-menu-item a {
    color: #fff;
    background: #009de0;
}
.et_pb_extra_module.tbp-archivio {
	box-shadow:none;
}
.tbp-archivio .entry-header {
    width: 100%;
}
.tbp-archivio a { 
	font-size: 16px;
    text-transform: none;
	transition: .2s;
	letter-spacing: 0;
}
.tbp-archivio a:hover { 
	color: #009de0;
}
.tbp-archivio .entry-meta {
    border-bottom: 1px solid #cecece;
    margin-bottom: 10px;
}
.tbp-archivio .entry-meta a { 
	font-weight:bold;
	color:#777;
}
.tbp-archivio .hentry {
	border:0;
	padding: 0;
    margin-bottom: 10px;
}
.tbp-archivio div.post-teaser {
	padding-bottom: 10px;
}
.archive-pagination .pagination li>.page-numbers.current, .archive-pagination>.page-numbers li>.page-numbers.current, .paginated .pagination li>.page-numbers.current, .paginated>.page-numbers li>.page-numbers.current, .archive-pagination .pagination li, .archive-pagination>.page-numbers li, .paginated .pagination li, .paginated>.page-numbers li {
	border-radius:0;
}
.pdfprnt-top-right, .pdfprnt-bottom-right, .pdfprnt-top-bottom-right, .pdfprnt-right {
    padding: 10px 0px;
    border-top: 1px solid #ccc;
}
#back_to_top {
    border-radius: 0;
    background: #3E8498;
    bottom: 20px;
    right: 20px;
}
#back_to_top:hover { 
	background: #3E8498CC;
}
.clr {
	clear: both;
}

.home .issuem_archive { 
	flex-basis: calc(100% - 10px);
	margin:auto;
}
.btn-esperia {
	color: #F58217!important;
    border-width: 0px!important;
    border-radius: 0px;
    font-size: 15px;
    text-transform: uppercase!important;
    background-color: #FFFFFF;
	padding: 10px !important;
    display: block !important;
}
.btn-esperia:hover {
	transform: scale(1.05);
    background: rgba(255,255,255,0.9) !important;
}
.btn-esperia:after {
    display: none;
}
.home article h3 {
	font-weight: 400;
}
article .thumbnail {
	margin-bottom: 15px;
}
article .tbp-cover {
	object-fit: cover;
	height:350px;
}
.section-title i {
	color:#009ab2;
	font-size:14px;
}
.section-title h2 {
	font-weight: 400;
}
.home article h3 a {
	font-size: 24px;
	color: #000 !important;
}
.home article {
	background: transparent;
}
.home .meta-cat {
    padding-bottom: 10px;
}
.home .meta-cat a {
	color: #706f6f;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
	padding-bottom: 10px;
	letter-spacing: 0.1em;
    margin: 0;
}
.layout-miniatura img {
    	width: 120px;
}
article.layout-testo:not(:last-of-type) {
    border-bottom: 1px solid #bbb !important;
    border-radius: 0;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
#copertina .et_pb_column_2_5 {
	width: 40.1%;
	margin-right: 0;
}
#copertina .next_previous_archive_pagination {
	display:none;
}
#tbp-login .et_pb_widget {
    width: calc(100% - 10px);
    clear: none;
    float: none;
    margin: 10px auto !important;
}
.store-brand {
	text-align:center;
}
.store-brand a {
    margin: 20px 10px;
    display: inline-block;
}
.form-ricerca label, .form-ricerca input, .form-ricerca select, .form-ricerca submit {
	display:inline-block;
	width:100%;
	height:40px;
}
.form-ricerca input, .form-ricerca select {
	margin-top:10px;
	margin-bottom: 20px;
	border-radius:0;
	background: #f9f9f9;
}
.form-ricerca input[type="submit"] {
	margin-top:20px;
	margin-bottom: 20px;
	border-radius:0;
	background: #f12961;
	color: #fff;
}
.form-ricerca input[type="submit"]:hover {
	background: #f12961aa;
}
.vai-nrnum {
	margin: 30px 0;
}
.vai-nrnum label {
    display: block;
    font-weight: 600;
    color: #000;
    margin-bottom: 10px;
}
.vai-nrnum input#nrnum {
    width: 75%;
    height: 40px;
    border-radius: 0;
    background: #e6e6e6;
    color: #000;
    font-weight: 600;
	border: 1px solid #333;
}
.vai-nrnum input[type="submit"] {
    width: calc(25% - 2px);
    margin: 0px 0 0 2px;
    border-radius: 0;
    background: #f29200;
    color: #fff;
    padding-top: 8px;
    box-sizing: border-box;
    padding-bottom: 12px;
}
.soundcloud-player {
    padding: 10px 10px 0;
    background: #eceaeb;
    margin: 15px auto;
}
.pdfprnt-buttons [href*="multimediali"] {
    display: none;
}
span.pdfprnt-button-title {
    font-size: 14px;
    text-transform: uppercase;
    color: #8a8787;
}
img[alt="image_print"] {
    width: 30px;
}
/* Vimeo x audio */
.vimeo-flex {
    height: 55px;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 30px;
}
@media screen and (max-width:328px) {
	.vimeo-flex {
		justify-content: center;
	}
}
/* Media Query Responsive Design*/

/* Header + Navigazione principale */
@media screen and (min-width:1025px) {
	#main-header .logo { 
		height: 180px !important;
		margin: 65px auto 50px !important;
	}
	#et-navigation > ul > li {
		margin: 0;
		width: /*16.5%;*/14.2%;
		box-sizing: border-box;
		padding: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		min-height: 48px;
	}	
	#et-navigation a {
		font-size: 16px;
	}
	#et-navigation, #et-navigation>ul {
		width: 100%;
		justify-content: space-between;
	}
	#et-menu li a {
		line-height: 110%;
	}
	.header.left-right #et-navigation > ul > li > a {
		padding: 5px !important;
	}
	header.header li ul {
		top: 48px;
		padding: 2px 0 0 0;
		left: 0 !important;
	}
	#et-menu li > a:after {
		font-weight: bold;
		font-size: 14px;
		position: absolute;
		margin-left: 1px;
		display: none;
	}
	.next_previous_archive_pagination {
		margin-right:20px;
	}
	
}


@media screen and (max-width: 1024px) {
	#et-mobile-navigation nav {
		padding: 0;
	}
	#et-navigation li li {
		padding:0 15px;
	}
	#et-navigation li a {
		padding: 15px;
		border-bottom: 2px solid #fff ;
	}
	#et-navigation .sub-menu li a {
		border-bottom: 1px solid;
	}
	#et-navigation .sub-menu li:last-child a {
		border: 0;
	}    
    #main-header .logo {
        background: none;
        top: 0; 
        order: 1;
        margin-bottom: 10px;
		height: 60px;
    }
	
    /*#tag-title-line {
        top: 0; 
        order: 3;
    }*/
    .left-right #et-navigation {
        order:2;
        margin-top: 20px;
    }
    /*#tag-title-line {
        width: 100%;
    }*/
	.issuem_archive {
    	flex-basis: calc(50% - 10px);
		margin-left: 5px;
		margin-right: 5px;	
	}
}
@media screen and (max-width: 479px) {
	.issuem_archive {
    	flex-basis: calc(100% - 10px);
	}
}

@media screen and (max-width: 380px) {
	.layout-miniatura img, .issuem_current_issue_page img {
    	width: 100%;
		float:none;
		display:block;
		margin-bottom:15px;
		max-width:100%;
	}
	
 }
 @media screen and (max-width: 767px) { 
    .tag-title {
        font-size: 1em;
        line-height: 110%;
        padding-top:0;
    }
	 .login-search {
    	flex-wrap: wrap;
}
	.login-search .et_pb_widget {
		margin: 0 0 20px 0;
		width: 100%;
	}
	#novita-editoriale .et_pb_column {
		width:100% !important;
	}
	 #copertina .et_pb_column_2_5, #copertina .et_pb_column_3_5 {
		 width: 100% !important;
	 }
}


/* Layout generale 2 colonne */
@media screen and (min-width:991px) {
	#content-area .et_pb_extra_column_main {
		max-width: 72%;
	}
	#content-area .et_pb_extra_column_sidebar {
		max-width: 27%;
		margin-left: 1%;
	}
	.home .et_pb_extra_column_main > article {
		margin-bottom:0;
	}
	#custom_html-8.et_pb_widget .widgettitle.tutti-numeri {
		display: block !important;
		margin-left: -15px;
		margin-top:20px;
}
}
@media screen and (max-width: 990px) { 
	.page-id-239 .et_pb_extra_column_sidebar .cerca-numeri {
		display:none;
	}
	.archive_by_year_main {
		display:block;
	}
	.vai-nrnum {
    	margin: 30px 5px;
	}
	.archive_by_year_main ul.anno-pubblicazione {
		background: #eceaeb;
		padding: 10px;
		margin: 0 5px 10px 5px;
		display: flex;
    	flex-wrap: wrap;
	}
	.archive_by_year_main .anno-pubblicazione li {
		flex-basis: calc(20% - 2px);
	}
	.archive_by_year_main .anno-pubblicazione li a {
		font-size:13px;
		padding: 15px 8px;
	}
	
	/*.et_pb_extra_column_sidebar .anno-pubblicazione,*/ .archive_by_year_main h4 {
		margin:5px;
	}
}

@media screen and (min-width:600px) and (max-width:990px) {
	#content-area .et_pb_extra_column_sidebar {
		display:block;
		column-count: 2;
    	column-gap: 20px;
	}
	.et_pb_extra_column_sidebar .et_pb_widget {
		display: inline-block;
    	width: 100%;
	}
}
/********************
 * 
 * ACCESSIBILITA
 * 
 * ******************/

.input:focus, .textarea:focus, input:focus, input[type="number"]:focus, input[type="email"]:focus, input[type="password"]:focus, input[type="search"]:focus, input[type="text"]:focus, select:focus, textarea:focus, .vai-nrnum input#nrnum:focus {
	border: 2px solid #333;
	font-weight:bold;
	background: #fefefe;
    color: #000;
}
#et-navigation li:active, .anno-pubblicazione a:active, a.logo:active, a:focus {
	outline: 2px solid #333;
}
#et-navigation .menu-item a:focus {
	outline: none;
}
.skip-link {
  background: #333;
  color: #fff !important;
	font-size:16px;
  font-weight: 600;
  left: 0%;
  padding: 4px;
  position: absolute;
 transform: translateY(-100%);
  transition: transform 0.3s;
  z-index: 30000;
}

.skip-link:focus {
  transform: translateY(0%);
}
/*
#et-navigation>ul>li {
    margin: 0 25px !important;
}
#et-navigation a[accesskey]:before {
	content: " [" attr(accesskey) "] ";
	font-family: "Montserrat", Helvetica, Arial, Lucida, sans-serif;
	display: inline !important;
    opacity: 1 !important;
    left: -20px;
    width: auto !important;
    background: transparent;
    line-height: 4px;
    transform: none !important;
	color: #666;
    font-weight: 600;
}
.et-shadow {
	border: 1px solid #ddd;
}

.et-box {
	margin: 0 0 10px;
	-webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
	box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
	font-size: 14px;
	position: relative;
}

.et-shadow .et-box-content {
    color: #737373;
    background: #fafafa;
    border: 1px solid #fafafa;
    -webkit-box-shadow: inset 0 0 45px #e7e7e7;
    box-shadow: inset 0 0 45px #e7e7e7;
}
.et-box-content {
    text-shadow: 1px 1px 1px #ffffff;
    padding: 27px 43px 17px 66px;
    min-height: 35px;
}

p {
	margin-bottom: 1.6em;
}
*/</style>`;
