import Header from "../../components/header/Header";
import ClockInOutButtons from "../../components/buttons/clockInOutButtons/ClockInOutButtons";
import NumberPad from "../../components/numberPad/NumberPad";
import Footer from "../../components/footer/Footer";

import "./homePage.css";

const HomePage = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <main className='homepage-main'>
                    <aside className='homepage-aside homepage-left-aside'>
                        <ClockInOutButtons />
                    </aside>
                    <aside className='homepage-aside homepage-right-aside'>
                        <NumberPad />
                    </aside>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default HomePage;