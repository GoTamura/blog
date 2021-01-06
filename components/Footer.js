import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer({ children }) {
    return (
        <footer class={styles.footer}>
            <p class={styles.copyright}>Copyright © 2021 cherry.graphics</p>
        </footer>
    )
}