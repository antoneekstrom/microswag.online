import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import { Main, Content, Centered, GridContainer, GridItem, GRID_LEFT, GRID_RIGHT } from '../components/containers';
import { ImageComponent, ALIGN_RIGHT, ALIGN_LEFT, ImageSlide, Image } from '../components/image';
import { Highlight, Heading, Title, Spacing, Paragraph, Bold, List, Item } from '../components/components';
import { AnchorButton } from '../components/buttons';
import { CONTENT_WIDTH_BREAKPOINT } from '../components/navigation';


// this file contains the "Pages" of the application
// the actual text and image content

// images in the slideshow
const CAT_IMAGES = [
    new Image("static/images/cats/cats_2.jpg", "Three Cats", "Three Cats"),
    new Image("static/images/cats/kajsa_1_wide.jpg", "Kajsa", "Kajsa"),
    new Image("static/images/cats/cats_1_wide.jpg", "Two Cats", "Two Cats"),
    new Image("static/images/cats/alice_1_wide.jpg", "Alice", "Alice")
];

/**
 * The home page that is shown initially. This is the main page which introduces the visitor to the page and presents general information about the subject.
 */
export class CatHomePage extends Component<any, any> {

    /**
     * An IntersectionObserver is an object that detects when an element in the DOM is visible on the page
     */
    observer : IntersectionObserver;

    /**
     * A "visible" class is added to the images once they are visible the first time.
     * One problem with this is that when the size of the window is changed and the the site switches to mobile view,
     * the images aren't visible anymore because the observer can not see the elements. This page component, which is the parent of the images is not rerendered
     * when the children are, therefore I cannot reregister the components to the observer. I'm not sure how to fix this.
     * 
     * I would have to somehow observe the images individually in the image components themselves but that would be difficult to execute because of my current (flawed)
     * program structure. Because of this, I won't do anything about it. Just reload the site to show the images again.
     */
    registerImageAnimations() {
        this.observer = new IntersectionObserver((entries, o) => {
            // iterates over all observed elements which are the text containers on the main page
            // from there I find the image associated with the text and apply/remove a "visible" class
            // I had to observe the text instead of the images because the images are initially halfway outside the window
            // before they slide into view and that messed up the intersection observation
            for (let e of entries) {
                for (let c of e.target.parentElement.children) {
                    let target = c;
                    if (target.classList.contains("image-component")) {

                        if (e.isIntersecting && !target.classList.contains("visible")) {
                            target.classList.add("visible");
                            o.unobserve(e.target);
                        }
                    }
                }
            }
        }, {threshold: 0.4});
        const images = document.querySelectorAll(".image-container .text-container");
        images.forEach(e => this.observer.observe(e));
    }

    componentDidMount() {
        this.registerImageAnimations();
    }

    render() {
        return (
            <Main>
                <ImageSlide showText={false} images={CAT_IMAGES} slideTimer={5000}></ImageSlide>
                <Content>
                    <Title large>En sida om katter</Title>
                    <Heading>
                        Välkommen till en webbsida som handlar om <Highlight>katter</Highlight>.
                        Här finner du information om katters egenskaper, ursprung och mina egna katt-kamrater. Informationen på den här sidan
                        är oerhört pålitlig på grund av att jag har forskat inom det här ämnet sedan jag föddes och är expert inom mitt fält.
                    </Heading>
                </Content>
                <Spacing height="7rem" />
                <Centered>
                    <ImageComponent align={ALIGN_LEFT} alt="kajsa" src="static/images/cats/kajsa_2.jpg" width={"45%"} imageClass="animated">
                        <div className="text-container">
                            <Heading>Vad är en katt?</Heading>
                            <Paragraph>
                                En katt är ett föremål som kan användas för sällskap, värme och rivmärken.
                                En katt har vanligtvis fyra stycken ben, ett huvud och en svans. Katten använder
                                sin svans för att slå dig i ansiktet och hålla balansen.
                            </Paragraph>
                        </div>
                    </ImageComponent>
                    <ImageComponent align={ALIGN_RIGHT} alt="vincent" src="static/images/cats/vincent_1.jpg" width={"45%"} imageClass="animated">
                        <div className="text-container">
                            <Heading>Var är en katt?</Heading>
                            <Paragraph>
                                En katts naturliga habitat är en så kallad <Bold>människo-bostad</Bold>.
                                Katter trivs mycket väl i den här typen av miljö, här kan de vila under väldigt långa perioder utan att
                                behöva oroa sig över att bli anfallna av större rovdjur.
                            </Paragraph>
                        </div>
                    </ImageComponent>
                    <ImageComponent align={ALIGN_LEFT} alt="alice" src="static/images/cats/alice_1.jpg" width={"45%"} imageClass="animated">
                        <div className="text-container">
                            <Heading>När är en katt?</Heading>
                            <Paragraph>
                                Katter, som de flesta levande varelser, har en begränsad livstid. Katter föds när de är ungefär 0 år gamla
                                och kan leva upp mot ca. 16 år.
                            </Paragraph>
                        </div>
                    </ImageComponent>
                    <ImageComponent align={ALIGN_RIGHT} alt="cats" src="static/images/cats/cats_1.jpg" width={"45%"} imageClass="animated">
                        <div className="text-container">
                            <Heading>Hur är en katt?</Heading>
                            <Paragraph>
                                Katter är de enda varelserna som vi vet har tamt sig själva. När människor började att bosätta
                                sig och kultivera grödor drogs katterna till dessa grödor. Andra varelser som drogs sig till dessa
                                grödor var möss och insekter som inte var lika välkomna. Katterna tog hand om dessa vilket människorna
                                uppskattade och därmed lät katterna stanna kvar.
                            </Paragraph>
                        </div>
                    </ImageComponent>
                </Centered>
            </Main>
        );
    }
}

/**
 * The second page presents additional content.
 */
export class CatSecondPage extends Component<any, {ids : string[]}> {

    constructor(props) {
        super(props);

        this.state = {
            ids: []
        };
    }

    componentDidMount() {

        // Here I collect all the titles of the different types of cats on the page
        // I use the ids of those titles to create an anchor for each one.

        let ids = [];
        const titles = document.querySelectorAll(".has-id");

        for (const title of titles) {
            ids.push(title.id);
        }

        // this componentDidMount() function is called after the first render and
        // because I set the state inside this method the page will be rerendered again
        // this is inefficient but it does not seem to affect the presentation/load of the content

        // I have to check all the ids after the first render when they are actually present
        // If I want to create this list dynamically that is, and I do want to do that
        this.setState({ids: ids});
    }

    /**
     * A list of the different titles of the page with links to them.
     * @param props the props
     * @param ids the ids to create anchors from
     */
    List(props : {ids: string[]}) {
        return (
            <div className="content-list">
                <Heading>Innehåll</Heading>
                {props.ids.map(id => <Item><AnchorButton id={id}>{id}</AnchorButton></Item>)}
            </div>
        );
    }

    render() {
        return (
            <Main>
                <Content>

                    <MediaQuery query={`(max-width: ${CONTENT_WIDTH_BREAKPOINT})`}>
                        {
                            (matches) => {
                                const Text = (props) => (
                                    <React.Fragment>
                                        <Title large>Olika typer av katter</Title>
                                            <Heading>Katten kan manifestera sig i ett flertal olika former som kan skilja sig mycket.</Heading>
                                        <Heading>Här kommer ett fåtal av de olika formerna du kan finna en katt.</Heading>
                                    </React.Fragment>
                                );
                                const Desktop = (props) => (
                                    <GridContainer>
                                        <GridItem area={GRID_LEFT}>
                                            <Text/>
                                        </GridItem>
                
                                        <GridItem area={GRID_RIGHT}>
                                            <this.List ids={this.state.ids} />
                                        </GridItem>
                                    </GridContainer>
                                );
                                const Mobile = (props) => (
                                    <div>
                                        <Text/>
                                        <this.List ids={this.state.ids} />
                                    </div>
                                );
                                return matches ? <Mobile/> : <Desktop/>;
                            }
                        }
                    </MediaQuery>

                    <Centered>
                        <Title id="Norsk Skogskatt">Norsk Skogskatt</Title>
                        <ImageComponent alt="Norsk Skogskatt" src="static/images/cats/vincent_2.jpg" width="45%">
                            <div className="text-container">
                                <Paragraph>
                                    Det här är <Bold>Vincent</Bold>. Han är en typ av <Bold>norsk skogskatt</Bold>. Det här betyder att han har mycket päls
                                    och är en trevlig individ. Han uppskattar att befinna sig utomhus i skogen och tycker om att ta med delar av skogen
                                    och placera dem på möbler som t.ex. sängar.
                                </Paragraph>
                                
                                <Heading>Statistik</Heading>
                                <List>
                                    <Item><Bold>Hastighet: </Bold>hög</Item>
                                    <Item><Bold>Vikt: </Bold>väldigt låg</Item>
                                    <Item><Bold>Storlek: </Bold>T H I N</Item>
                                    <Item><Bold>Hunger: </Bold>lagom</Item>
                                    <Item><Bold>högljudhet: </Bold>infrekvent</Item>
                                </List>
                            </div>
                        </ImageComponent>

                        <Title id="Tjock Katt">Tjock Katt</Title>
                        <ImageComponent alt="Tjock Katt" src="static/images/cats/kajsa_3.jpg" width="45%">
                            <div className="text-container">
                                <Paragraph>
                                    <Bold>Kajsa</Bold> är en tjock katt som inte tycker om att vara ute. Tjocka katter äter och sover mycket.
                                </Paragraph>
                                
                                <Heading>Statistik</Heading>
                                <List>
                                    <Item><Bold>Hastighet: </Bold>medel</Item>
                                    <Item><Bold>Vikt: </Bold>mycket hög</Item>
                                    <Item><Bold>Storlek: </Bold>liten fast ändå stor typ</Item>
                                    <Item><Bold>Hunger: </Bold>hög</Item>
                                    <Item><Bold>högljudhet: </Bold>ibland hög</Item>
                                </List>
                            </div>
                        </ImageComponent>

                        <Title id="Skum Katt">Skum (och tjock) katt</Title>
                        <ImageComponent alt="Skum Katt" src="static/images/cats/alice_2.jpg" width="45%">
                            <div className="text-container">
                                <Paragraph>
                                    Skumma katter är en subtyp av tjocka katter. Dessa katter är mycket speciella, de besitter egenskaper from tjocka katter och
                                    har andra kännetecken utöver det, som att vara skumma och ännu större än de tjocka katterna. Ingen vet riktigt säkert deras motivationer eller ursprung men en sak som är säker
                                    är att de ibland brukar krafsa på golvet utan anledning och låter jobbigt. <Bold>Alice</Bold> är en sådan katt.
                                </Paragraph>

                                <Heading>Statistik</Heading>
                                <List>
                                    <Item><Bold>Hastighet: </Bold>låg</Item>
                                    <Item><Bold>Vikt: </Bold>massiv</Item>
                                    <Item><Bold>Storlek: </Bold>T H I C C</Item>
                                    <Item><Bold>Hunger: </Bold>enorm</Item>
                                    <Item><Bold>högljudhet: </Bold>väldigt jobbig</Item>
                                </List>
                            </div>
                        </ImageComponent>

                        <Title id="Default Katt">Default katt</Title>
                        <ImageComponent alt="Basic Katt" src="https://img-aws.ehowcdn.com/400x400p/photos.demandstudios.com/getty/article/238/213/stk208009rke.jpg" width="45%">
                            <div className="text-container">
                                <Paragraph>
                                    Den vanligaste typen av katter är en sådan här <Bold>basic</Bold> katt. Det är den typiska katten man finner
                                    i en människas bostad och kan ofta vara rätt tråkiga. Ibland är dem coola dock, man får bedöma dessa katter från fall till fall.
                                </Paragraph>
                                
                                <Heading>Statistik</Heading>
                                <List>
                                    <Item><Bold>Hastighet: </Bold>medel</Item>
                                    <Item><Bold>Vikt: </Bold>medel</Item>
                                    <Item><Bold>Storlek: </Bold>medel</Item>
                                    <Item><Bold>Hunger: </Bold>hög</Item>
                                    <Item><Bold>högljudhet: </Bold>låg</Item>
                                </List>
                            </div>
                        </ImageComponent>

                        <Title id="Stor Katt">S T O R katt</Title>
                        <ImageComponent alt="Stor katt" src="https://www.papo-france.com/473-thickbox_default/large-lion.jpg" width="45%">
                            <div className="text-container">
                                <Paragraph>
                                    Det finns också väldigt stora katter, som ändå inte är överviktiga. Dessa katter är mycket farliga om man
                                    möter dem utomhus i vildmarken, men det finns och sådana som är ganska snälla tror jag.
                                </Paragraph>
                                
                                <Heading>Statistik</Heading>
                                <List>
                                    <Item><Bold>Hastighet: </Bold>mycket hög</Item>
                                    <Item><Bold>Vikt: </Bold>förmodligen ganska hög</Item>
                                    <Item><Bold>Storlek: </Bold>S T O R</Item>
                                    <Item><Bold>Hunger: </Bold>mycket hög</Item>
                                    <Item><Bold>högljudhet: </Bold>kan nog låta väldigt högt skulle jag tro</Item>
                                </List>
                            </div>
                        </ImageComponent>

                    </Centered>
                </Content>
            </Main>
        );
    }
}