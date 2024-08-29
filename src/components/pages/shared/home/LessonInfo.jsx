export default function LessonInfo({Icon, title, desc}) {
    return (
        <article
            className="flex-container-content flex p-5 text-secondary transition-colors duration-300 gap-5 middle:justify-between justify-start  items-center">
            <Icon className="text-6xl text-color5f"/>
            <div className="flex flex-col gap-3">
                <span className="text-xl text-color12 font-bold font-roboto-slab">{title}</span>
                <span className="text-color66">{desc}</span>
            </div>
        </article>
    )
}