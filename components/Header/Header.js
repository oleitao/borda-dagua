import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { BsCalendar2MonthFill } from "react-icons/bs";
import { FaBicycle } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { FiMapPin } from "react-icons/fi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCity } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Páginas Soltas</h1>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          <IoHomeSharp className={styles.icon} />
          <span className={styles.linkText}>Início</span>
        </Link>
        <Link href="/municipios" className={styles.link}>
          <FaCity className={styles.icon} />
          <span className={styles.linkText}>Municipios</span>
        </Link>
        <Link href="/temperatura" className={styles.link}>
          <TiWeatherPartlySunny className={styles.icon} />
          <span className={styles.linkText}>Tempo</span>
        </Link>
        <Link href="/mapa" className={styles.link}>
          <FiMapPin className={styles.icon} />
          <span className={styles.linkText}>Mapa</span>
        </Link>
        <Link href="/mapaBicis" className={styles.link}>
          <FaBicycle className={styles.icon} />
          <span className={styles.linkText}>Bicis</span>
        </Link>
        <Link href="/graphs" className={styles.link}>
          <GoGraph className={styles.icon} />
          <span className={styles.linkText}>Gráficos</span>
        </Link>
        <Link href="/calendar" className={styles.link}>
          <BsCalendar2MonthFill className={styles.icon} />
          <span className={styles.linkText}>Tarefas</span>
        </Link>
      </nav>
    </header>
  );
}
