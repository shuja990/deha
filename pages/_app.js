import '../assets/styles/bootstrap.min.css';
import '../assets/styles/icofont.min.css';
import '../assets/styles/responsive.scss';
import '../assets/styles/animate.min.css';
import '../assets/styles/style.scss';
import { Provider } from 'react-redux';
import { Preloader, Placeholder } from 'react-preloading-screen';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store/reducers/cartReducer';
import { DefaultSeo } from 'next-seo';
import Loader from '../components/shared/Loader';
import GoTop from '../components/shared/GoTop';

export default withRedux(initStore)(
    class MyApp extends App {
        static async getInitialProps ({ Component, ctx }) {
            return {
                pageProps: Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {}
            }
        }

        render () {
            const { Component, pageProps, store } = this.props

            return (
                <React.Fragment>
                    <DefaultSeo
                        title="The Caribbean American Restaurant Association"
                        description="The Caribbean American Restaurant Association"
                        openGraph={{
                            type: 'website',
                            locale: 'en_IE',
                            url: 'https://nextland-react.envytheme.com/',
                            site_name: 'The Caribbean American Restaurant Association',
                        }}
                    />
                    <Preloader>
                        <Provider store={store}>
                            <Component {...pageProps} />
                        </Provider>
                        <GoTop scrollStepInPx="50" delayInMs="16.66" />
                        <Placeholder>
                            <Loader />
                        </Placeholder>
                    </Preloader>
                </React.Fragment>
            );
        }
    }
)