import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class AppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="pt">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <link href="https://fonts.googleapis.com/css?family=Crimson+Text&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
                    <meta
                        name="description"
                        content="Brasil na X é um site para ajudar brasileiros a entrarem na Ecole Polytechnique!"
                    />
                    <meta
                        name="keywords"
                        content="Brasil, Ecole Polytechnique, Polytechnique, X, Brasil na X"
                    />
                    <meta name="author" content="brasilnax.com.br" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
