import { Symptom, Rule } from '../core/types';

export const SYMPTOMS: Symptom[] = [
  // --- SÍNTOMAS DE HARDWARE ---
  { id: 'sym_no_power', label: 'El equipo no enciende ni enciende ninguna luz', category: 'Hardware' },
  { id: 'sym_beeps', label: 'El equipo emite pitidos al intentar arrancar', category: 'Hardware' },
  { id: 'sym_overheat', label: 'El equipo se calienta demasiado en poco tiempo', category: 'Hardware' },
  { id: 'sym_blue_screen', label: 'Pantalla azul de la muerte (BSOD) frecuente', category: 'Hardware' },
  { id: 'sym_disk_noise', label: 'Ruido metálico o chasquidos en el disco duro', category: 'Hardware' },

  // --- SÍNTOMAS DE SOFTWARE ---
  { id: 'sym_slow_boot', label: 'El sistema operativo tarda demasiado en iniciar', category: 'Software' },
  { id: 'sym_popups', label: 'Anuncios emergentes y comportamiento extraño del navegador', category: 'Software' },
  { id: 'sym_app_crash', label: 'Las aplicaciones se cierran inesperadamente', category: 'Software' },
  { id: 'sym_high_cpu', label: 'El uso del CPU o RAM se mantiene al 100% sin programas abiertos', category: 'Software' },
  { id: 'sym_no_internet', label: 'Sin acceso a Internet o errores de configuración de red', category: 'Software' }
];

export const RULES: Rule[] = [
  // --- REGLAS DE HARDWARE ---
  {
    id: 'rule_overheating',
    symptomsRequired: ['sym_overheat'],
    result: {
      id: 'diag_overheat',
      title: 'Sobrecalentamiento del Procesador (CPU)',
      category: 'Hardware',
      severity: 'Alta',
      description: 'El procesador está alcanzando temperaturas elevadas debido a un sistema de refrigeración deficiente o degradación de la pasta térmica.',
      solutions: [
        'Limpiar el polvo acumulado en los disipadores, ventiladores y rejillas de ventilación.',
        'Retirar la pasta térmica seca y aplicar una nueva capa de pasta térmica de buena calidad sobre el procesador.',
        'Verificar que el ventilador o disipador del CPU esté girando adecuadamente y bien ajustado.',
        'Evitar obstruir las salidas de aire del equipo y usar el sistema sobre superficies planas y despejadas.'
      ]
    }
  },
  {
    id: 'rule_psu_failure',
    symptomsRequired: ['sym_no_power'],
    result: {
      id: 'diag_psu',
      title: 'Falla en la Fuente de Poder o Cableado',
      category: 'Hardware',
      severity: 'Alta',
      description: 'El sistema no recibe energía eléctrica suficiente o la fuente está averiada.',
      solutions: [
        'Verificar la conexión del cable de toma corriente y el interruptor posterior.',
        'Probar con otro cable de poder o tomacorriente.',
        'Realizar prueba de puenteo a la fuente de poder o reemplazarla.'
      ]
    }
  },
  {
    id: 'rule_ram_failure',
    symptomsRequired: ['sym_beeps', 'sym_blue_screen'],
    result: {
      id: 'diag_ram',
      title: 'Falla o Suciedad en Memoria RAM',
      category: 'Hardware',
      severity: 'Alta',
      description: 'El POST de la tarjeta madre detecta un error de lectura/escritura en los módulos RAM.',
      solutions: [
        'Apagar el equipo, extraer los módulos de RAM y limpiar los contactos dorados con un borrador de nata.',
        'Probar los módulos uno a uno en distintos slots.',
        'Ejecutar una prueba con MemTest86.'
      ]
    }
  },
  {
    id: 'rule_hdd_failure',
    symptomsRequired: ['sym_disk_noise', 'sym_blue_screen'],
    result: {
      id: 'diag_hdd',
      title: 'Falla Mecánica Inminente en Unidad de Almacenamiento',
      category: 'Hardware',
      severity: 'Crítica',
      description: 'El disco duro presenta sectores dañados o falla en los cabezales físicos.',
      solutions: [
        'Realizar respaldo de datos inmediatamente.',
        'Verificar el estado de salud SMART con herramientas como CrystalDiskInfo.',
        'Reemplazar la unidad por un SSD.'
      ]
    }
  },

  // --- REGLAS DE SOFTWARE (COMBINADAS E INDIVIDUALES) ---
  {
    id: 'rule_malware_infection',
    symptomsRequired: ['sym_popups', 'sym_high_cpu', 'sym_slow_boot'],
    result: {
      id: 'diag_malware',
      title: 'Infección Severa por Software Malicioso (Malware/Adware)',
      category: 'Software',
      severity: 'Alta',
      description: 'Múltiples procesos no autorizados están consumiendo recursos del sistema, afectando el arranque y alterando el navegador.',
      solutions: [
        'Iniciar el sistema en Modo Seguro.',
        'Ejecutar un análisis profundo con un antivirus actualizado y Malwarebytes.',
        'Revisar y eliminar extensiones sospechosas en los navegadores.'
      ]
    }
  },
  {
    id: 'rule_slow_boot_ind',
    symptomsRequired: ['sym_slow_boot'],
    result: {
      id: 'diag_slow_boot',
      title: 'Sobrecarga en el Inicio del Sistema Operativo',
      category: 'Software',
      severity: 'Baja',
      description: 'Existen demasiados programas cargándose automáticamente al arrancar el sistema o archivos temporales acumulados.',
      solutions: [
        'Abrir el Administrador de Tareas y desactivar programas innecesarios en la pestaña "Inicio" / "Startup".',
        'Realizar una limpieza de archivos temporales utilizando el Liberador de Espacio en Disco.',
        'Verificar el estado de fragmentación de la unidad de almacenamiento.'
      ]
    }
  },
  {
    id: 'rule_popups_ind',
    symptomsRequired: ['sym_popups'],
    result: {
      id: 'diag_popups',
      title: 'Presencia de Malware / Extensiones Maliciosas',
      category: 'Software',
      severity: 'Media',
      description: 'El navegador tiene extensiones de publicidad instaladas o scripts no deseados secuestrando la navegación.',
      solutions: [
        'Restablecer la configuración predeterminada de los navegadores web.',
        'Revisar la lista de extensiones instaladas y eliminar las desconocidas.',
        'Ejecutar un análisis de Adware con AdwCleaner o Malwarebytes.'
      ]
    }
  },
  {
    id: 'rule_app_crash_ind',
    symptomsRequired: ['sym_app_crash'],
    result: {
      id: 'diag_app_crash',
      title: 'Corrupción de Archivos de Aplicaciones o Controladores',
      category: 'Software',
      severity: 'Media',
      description: 'Las aplicaciones se cierran debido a librerías faltantes, incompatibilidad de controladores o librerías dañadas.',
      solutions: [
        'Reinstalar la aplicación que presenta la falla.',
        'Ejecutar el comando `sfc /scannow` en la consola (CMD) como Administrador para reparar archivos del sistema.',
        'Actualizar los controladores de la tarjeta gráfica y paquetes Redistribuibles Visual C++.'
      ]
    }
  },
  {
    id: 'rule_high_cpu_ind',
    symptomsRequired: ['sym_high_cpu'],
    result: {
      id: 'diag_high_cpu',
      title: 'Procesos en Segundo Plano Descontrolados',
      category: 'Software',
      severity: 'Media',
      description: 'Servicios del sistema o aplicaciones en segundo plano están generando fugas de memoria o uso excesivo de CPU.',
      solutions: [
        'Abrir el Administrador de Tareas para identificar y finalizar el proceso que consume altos recursos.',
        'Pausar o actualizar las descargas automáticas de Windows Update.',
        'Realizar un escaneo rápido en busca de criptomineros o procesos maliciosos ocultos.'
      ]
    }
  },
  {
    id: 'rule_no_internet_ind',
    symptomsRequired: ['sym_no_internet'],
    result: {
      id: 'diag_no_internet',
      title: 'Problema de Configuración de Red o DNS',
      category: 'Software',
      severity: 'Media',
      description: 'El sistema tiene problemas para resolver direcciones de red o la pila TCP/IP presenta una configuración incorrecta.',
      solutions: [
        'Ejecutar el Solucionador de Problemas de Red del sistema operativo.',
        'Abrir la consola de comandos (CMD) como Administrador y ejecutar: `ipconfig /flushdns` y `netsh winsock reset`.',
        'Cambiar los servidores DNS a los DNS públicos de Google (8.8.8.8 y 8.8.4.4) o Cloudflare (1.1.1.1).'
      ]
    }
  }
];