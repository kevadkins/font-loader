import React, { Component } from 'react';
import logo from './logo.svg';
import WebFont from 'webfontloader';
import { Helmet } from "react-helmet";
import { config } from './config';
import { styles } from './styles';
import { fonts } from './fonts';

const appStyle = {
	wrapper: {
		display: "flex",
		height: "100vh"
	},
	panel: {
		width: "200px",
		padding: "40px",
		background: "#f5f5f5",
		borderRight: "1px solid #ccc"
	},
	app: {
		flex: 1
	},
	field: {
		marginBottom: "20px"
	},
	label: {
		display: "block"
	},
	input: {
		display: "block",
		fontSize: "inherit",
		padding: "0.5em"
	}
}

class App extends Component {

	// Styles and config probably wouldn't go in state, it's only done here so we can demo things changing.
	state = {
		config: { ...config },
		styles: { ...styles(config) }
	};

	componentWillMount() {
		// this.loadFonts();
	}

	componentWillUpdate() {
		// this.loadFonts();
	}

	// You could use a webfont loader to help with:
	// - Preventing a FOUT
	// - Adding links to document head
	// - Style fallbacks for unloaded fonts
	// - Hooking into loading events

	// In a real app you would only need to call WebFont.load() once at the root of the app. 
	// It's wrapped in function here so we can demo loading new fonts.
	// You would proabably build the WebFont.load() config based on your style config. For example, if there is no custom family, you wouldn't include it.

	loadFonts = () => {
		const { googleFontFamily, customFontFamily, fontWeights, fontLoadTimeout } = this.state.config;

		WebFont.load({
			google: {
				families: [`${googleFontFamily}:${fontWeights.join(',')}`]
			},
			custom: {
				families: [`${customFontFamily}`]
			},
			timeout: fontLoadTimeout
		});
	}

	updateConfig = (key, value) => {
		console.log(key, value);
		this.setState((prevState, props) => {
			let nextState = { ...prevState };
			nextState.config[key] = value;
			nextState.styles = styles(nextState.config);
			return nextState;
		})
	}

	updateConfigArray = (key, index, value) => {
		console.log(key, index, value);
		this.setState((prevState, props) => {
			let nextState = { ...prevState };
			nextState.config[key][index] = value;
			nextState.styles = styles(nextState.config);
			return nextState;
		})
	}

	render() {
		console.log(this.state);
		const { config, styles } = this.state;

		return (
			<div style={appStyle.wrapper}>

				{/* 
					Generate Google Font link and @font-face rules for any custom fonts.
					These get appended to the document head using Helmet.
				*/}
				<Helmet>
					<link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${config.googleFontFamily.split(" ").join("+")}:${config.fontWeights.join(',')}`} media="all" />

					{/* 
						Typekit example:
						<link rel="stylesheet" href=`https://use.typekit.net/${config.typeKitId}.css`>
					*/}

					<style type="text/css">
						{
							fonts.map(font => `
								@font-face {
									font-family: "${font.name}";
									src:url("${font.src}") format("${font.format}");
								}
							`).join(' ')
						}
					</style>
				</Helmet>

				<div style={appStyle.panel}>
					{
						Object.keys(config).map(item =>
							<div key={item} style={appStyle.field}>
								<label style={appStyle.label}>
									{item}
									{
										(Array.isArray(config[item]))
											?
											config[item].map((arrItem, index) =>
												<input key={index} style={appStyle.input} type="number" step="100" defaultValue={arrItem} onChange={(e) => this.updateConfigArray(item, index, e.target.value)} />
											)
											:
											<input style={appStyle.input} type="text" defaultValue={config[item]} placeholder={item} onBlur={(e) => this.updateConfig(item, e.target.value)} />
									}
								</label>
							</div>
						)
					}
					<small>Try custom: FiraMono, FiraSans Regular</small>
				</div>
				<div style={{ ...styles.app, ...appStyle.app }}>
					<header style={styles.appHeader}>
						<img src={logo} style={styles.appLogo} alt="logo" />
						<h1 style={styles.appTitle}>Web Font Loader Test</h1>
					</header>
					<main style={styles.appIntro}>
						<h1 style={styles.appHeading}>Heading</h1>
						<p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy
						foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
						<p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
						<p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.  Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>
					</main>
				</div>
			</div>
		);
	}
}

export default App;
