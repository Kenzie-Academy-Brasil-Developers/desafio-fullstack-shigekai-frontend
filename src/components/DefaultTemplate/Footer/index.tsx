import style from "./style.module.scss"

export const Footer = () => {
    return(
        <div className={style.wrap}>
            <footer className={style.footer}>
                <div>
                    <p className="headline primary-color">
                        © Todos diretos reservados a {" "}
                        <a className="headline primary-color" target="_blank"
                        href="https://www.linkedin.com/in/lucas-gabriel-73977815b/">
                            Lucas Gabriel
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    )
}