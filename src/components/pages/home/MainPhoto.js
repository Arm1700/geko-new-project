export default function MainPhoto({image, text1, text2}) {

    return (
        <section style={{
            backgroundImage: 'url(DSC07939.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100%',
        }} className="flex uppercase justify-center middle:h-[450px] md:h-[650px] h-[700px] flex-col text-pseudo px-5 relative overflow-hidden">

            {/*<video*/}
            {/*    autoPlay*/}
            {/*    muted*/}
            {/*    loop*/}
            {/*    className="absolute top-0 left-0 min-w-full min-h-full object-cover"*/}
            {/*    // playsinline=""*/}
            {/*    // class="mui-1se970o-video"*/}
            {/*    // controls=""*/}
            {/*    // data-automation="VideoPlayer"*/}
            {/*    // height="100%"*/}
            {/*    // loop=""*/}
            {/*    // muted=""*/}
            {/*    // autoplay=""*/}
            {/*    // width="100%"*/}
            {/*    poster="DSC07939.jpg"*/}
            {/*    // preload="auto"*/}
            {/*    // aria-label="video-player"*/}
            {/*    // controlslist="nodownload"*/}
            {/*>*/}
            {/*    <source*/}
            {/*        src="DSC07939.jpg"*/}
            {/*        type="video/webm"*/}
            {/*    />*/}

            {/*</video>*/}
            <div className="popularDiv relative absoluteP middle:top-[175px] top-[125px] left-[50%]">
                <div className="relative z-10 bg-white text-color12 middle:w-[520px] w-full p-[30px]">
                    <h1 className="font-roboto-slab no-underline whitespace-no-wrap min-h-0 min-w-0 text-left leading-60 tracking-normal font-bold text-4xl sm:text-5xl backdrop-filter-none filter-none transform-origin-center opacity-100 translate-x-0 translate-y-0 visible">
                        Today a Reader, Tomorrow a Leader
                    </h1>
                </div>
            </div>
        </section>

//   <section style={backgroundImageStyle} className="h-[80vh] bg-no-repeat bg-cover bg-primary flex uppercase justify-center flex-col text-pseudo px-20 ">
        //     <h5 className="text-bold  sm:text-xl mb-5">{text1}</h5>
        //     <h1 className=" font-roboto-slab h-auto w-auto text-white no-underline whitespace-no-wrap min-h-0 min-w-0 text-left leading-60 tracking-normal font-bold  text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl  backdrop-filter-none filter-none transform-origin-center opacity-100 translate-x-0 translate-y-0 visible">{text2}</h1>
        //   </section>
    );
}
