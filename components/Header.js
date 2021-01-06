import Link from "next/link";
import styles from "./header.module.css";
import MediaQuery from "react-responsive";

export default function Header({ children }) {
  return (
    <header class={styles.header}>
      <div class={styles.container}>
        <h1 class={styles.title}>
          <Link href="/about">
            <a class={styles.title_a}>Go Tamura</a>
          </Link>
        </h1>
        <MediaQuery query="(min-width: 767px)">
          <nav class={styles.gloval_nav}>
            <ul>
              <li class={styles.nav_item}>
                <Link href="/about">
                  <a class={styles.a}>About</a>
                </Link>
              </li>
              <li class={styles.nav_item}>
                <Link href="/posts">
                  <a class={styles.a}>Blog</a>
                </Link>
              </li>
              <li class={styles.nav_item}>
                <Link href="/works">
                  <a class={styles.a}>Works</a>
                </Link>
              </li>
            </ul>
          </nav>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
          <input type="checkbox" />
          <nav class={styles.gloval_nav}>
            <ul>
              <li class={styles.nav_item}>
                <Link href="/about">
                  <a class={styles.a}>About</a>
                </Link>
              </li>
              <li class={styles.nav_item}>
                <Link href="/posts">
                  <a class={styles.a}>Blog</a>
                </Link>
              </li>
              <li class={styles.nav_item}>
                <Link href="/works">
                  <a class={styles.a}>Works</a>
                </Link>
              </li>
            </ul>
          </nav>
        </MediaQuery>
      </div>
    </header>
  );
}
