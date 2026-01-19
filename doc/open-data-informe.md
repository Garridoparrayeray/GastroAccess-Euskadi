# Informe de Investigación: Evaluación Técnica Exhaustiva y Propuesta de Valor del Ecosistema de APIs de Open Data Euskadi

![alt text](image.png)
![alt text](image-1.png)

- [Informe de Investigación: Evaluación Técnica Exhaustiva y Propuesta de Valor del Ecosistema de APIs de Open Data Euskadi](#informe-de-investigación-evaluación-técnica-exhaustiva-y-propuesta-de-valor-del-ecosistema-de-apis-de-open-data-euskadi)
  - [1. Introducción y Contexto Estratégico](#1-introducción-y-contexto-estratégico)
  - [2. Análisis de Infraestructura y Paradigmas de Interoperabilidad](#2-análisis-de-infraestructura-y-paradigmas-de-interoperabilidad)
    - [2.1 Arquitectura REST y Servicios Web](#21-arquitectura-rest-y-servicios-web)
    - [2.2 Formatos de Serialización y Estándares de Datos](#22-formatos-de-serialización-y-estándares-de-datos)
    - [2.3 Web Semántica y Linked Open Data (LOD)](#23-web-semántica-y-linked-open-data-lod)
    - [2.4 Modelos de Seguridad y Autenticación](#24-modelos-de-seguridad-y-autenticación)
  - [3. Auditoría Exhaustiva del Catálogo de APIs por Sector](#3-auditoría-exhaustiva-del-catálogo-de-apis-por-sector)
    - [3.1 Dominio de Medio Ambiente y Meteorología](#31-dominio-de-medio-ambiente-y-meteorología)
      - [3.1.1 API de Euskalmet (Agencia Vasca de Meteorología)](#311-api-de-euskalmet-agencia-vasca-de-meteorología)
      - [3.1.2 API de Calidad del Aire](#312-api-de-calidad-del-aire)
      - [3.1.3 API de Mediciones de Polen](#313-api-de-mediciones-de-polen)
      - [3.1.4 API de Aguas (Consumo y Masas de Agua)](#314-api-de-aguas-consumo-y-masas-de-agua)
    - [3.2 Dominio de Movilidad y Transporte](#32-dominio-de-movilidad-y-transporte)
      - [3.2.1 API de Tráfico](#321-api-de-tráfico)
      - [3.2.2 Moveuskadi (Planificador y Datos de Transporte Público)](#322-moveuskadi-planificador-y-datos-de-transporte-público)
    - [3.3 Dominio Socioeconómico y Cultural](#33-dominio-socioeconómico-y-cultural)
      - [3.3.1 API de Contratación Pública](#331-api-de-contratación-pública)
      - [3.3.2 API de Eventos Culturales (Kulturklik)](#332-api-de-eventos-culturales-kulturklik)
      - [3.3.3 API de Turismo y Recursos Turísticos](#333-api-de-turismo-y-recursos-turísticos)
      - [3.3.4 APIs de Estadística (Eustat y Udalmap)](#334-apis-de-estadística-eustat-y-udalmap)
    - [3.4 Otros Servicios Relevantes](#34-otros-servicios-relevantes)
  - [4. Arquitectura de Soluciones: Propuestas de Aplicación y Casos de Uso](#4-arquitectura-de-soluciones-propuestas-de-aplicación-y-casos-de-uso)
    - [Caso de Uso 1: Plataforma de Movilidad Personal Saludable ("BreatheSafe Euskadi")](#caso-de-uso-1-plataforma-de-movilidad-personal-saludable-breathesafe-euskadi)
    - [Caso de Uso 2: Herramienta de Inteligencia de Localización para Inversores ("Gastro-Market Insight")](#caso-de-uso-2-herramienta-de-inteligencia-de-localización-para-inversores-gastro-market-insight)
    - [Caso de Uso 3: Sistema de Gestión de Resiliencia de Infraestructuras Críticas](#caso-de-uso-3-sistema-de-gestión-de-resiliencia-de-infraestructuras-críticas)
    - [Caso de Uso 4: Asistente Legal Inteligente para Contratación Pública](#caso-de-uso-4-asistente-legal-inteligente-para-contratación-pública)
    - [Caso de Uso 5: Plataforma de Prescripción Social y Activos de Salud ("Euskadi Aktiboa Digital")](#caso-de-uso-5-plataforma-de-prescripción-social-y-activos-de-salud-euskadi-aktiboa-digital)
  - [5. Desafíos Técnicos y Recomendaciones de Implementación](#5-desafíos-técnicos-y-recomendaciones-de-implementación)
    - [5.1 Gestión de Latencia y Caché](#51-gestión-de-latencia-y-caché)
    - [5.2 Homogeneización Semántica](#52-homogeneización-semántica)
    - [5.3 Privacidad y Ética](#53-privacidad-y-ética)
    - [5.4 Mantenimiento de Claves y Seguridad](#54-mantenimiento-de-claves-y-seguridad)
  - [6. Conclusión](#6-conclusión)
  - [Obras citadas](#obras-citadas)

## 1. Introducción y Contexto Estratégico

La evolución de la administración digital en el País Vasco ha transitado desde la mera publicación de información estática hacia la consolidación de una infraestructura de datos abiertos dinámica e interoperable. El portal Open Data Euskadi, dependiente del Gobierno Vasco, se erige no solo como un repositorio de transparencia, sino como un nodo crítico de servicios digitales que alimenta a otros sistemas administrativos, empresas privadas y a la ciudadanía en general. Este informe tiene como objetivo diseccionar la arquitectura técnica de las Interfaces de Programación de Aplicaciones (APIs) disponibles en dicho catálogo y proponer arquitecturas de solución que exploten estos activos para generar valor socioeconómico.

En el contexto actual de la economía del dato, la disponibilidad de mecanismos de acceso automatizado (APIs) frente a la descarga manual de ficheros (CSV, XLS) marca la diferencia entre un portal de datos pasivo y un ecosistema de innovación en tiempo real. La investigación realizada sobre la documentación técnica y los metadatos del catálogo [^1^] revela un compromiso institucional con estándares abiertos (REST, JSON, XML, RDF) y dominios de alta criticidad como la meteorología, la movilidad y la salud ambiental.

El presente documento se estructura en dos grandes bloques. El primero realiza una auditoría técnica pormenorizada de cada servicio API identificado, analizando sus protocolos, formatos de serialización, frecuencia de actualización y modelos de seguridad. El segundo bloque despliega una serie de propuestas de aplicación práctica (casos de uso), donde se diseñan soluciones teóricas que integran múltiples fuentes de datos para resolver problemáticas complejas en ámbitos como la movilidad sostenible, la inteligencia de mercado y la gestión de emergencias.

## 2. Análisis de Infraestructura y Paradigmas de Interoperabilidad

Antes de descender al detalle de cada servicio, es imperativo comprender los cimientos tecnológicos sobre los que se sustenta la oferta de datos de Open Data Euskadi. La heterogeneidad de los datos—que van desde mediciones de sensores en tiempo real hasta registros administrativos anuales—ha obligado a la adopción de un enfoque híbrido en la distribución de la información.

### 2.1 Arquitectura REST y Servicios Web

La columna vertebral del acceso programático en Open Data Euskadi se basa en la arquitectura REST (Representational State Transfer). Este paradigma, estándar de facto en la industria del software moderno, permite a los desarrolladores interactuar con los recursos de datos (ya sean incidencias de tráfico o mediciones de calidad del aire) mediante operaciones HTTP estándar, principalmente GET para la consulta de información.

El análisis de los endpoints documentados [^2^] muestra una preferencia por URLs semánticas y predecibles, lo cual facilita la curva de aprendizaje para los integradores. Por ejemplo, las llamadas a servicios de tráfico o meteorología suelen estructurarse mediante parámetros de consulta (query parameters) que permiten filtrar por ubicación geográfica, tipo de sensor o ventana temporal. Esta capacidad de filtrado en origen es fundamental para reducir la latencia y el consumo de ancho de banda en aplicaciones móviles, evitando la transferencia de conjuntos de datos masivos cuando solo se requiere un subconjunto específico.

### 2.2 Formatos de Serialización y Estándares de Datos

La interoperabilidad técnica se garantiza mediante el soporte de múltiples formatos de representación. La investigación de los metadatos del catálogo [^1^] identifica los siguientes estándares predominantes:

*   **JSON (JavaScript Object Notation):** Se ha consolidado como el formato preferente para la mayoría de las nuevas APIs (Calidad del Aire, Transporte, Turismo). Su ligereza y capacidad de ser interpretado nativamente por navegadores y aplicaciones móviles lo hacen ideal para el desarrollo de clientes ligeros.
*   **XML (Extensible Markup Language):** Mantiene una presencia fuerte, especialmente en servicios con una larga trayectoria histórica o aquellos que requieren validaciones de esquema estrictas, como el servicio de incidencias de tráfico o la sindicación de contenidos (RSS).
*   **GeoJSON:** Dada la naturaleza territorial de la administración vasca, la componente geoespacial es omnipresente. El formato GeoJSON se utiliza extensivamente en los servicios de recursos turísticos, medio ambiente y transporte para representar geometrías complejas (puntos de interés, trazados de rutas, polígonos de zonas protegidas) junto con sus atributos descriptivos.[^5^]
*   **Formatos de Dominio Específico (GTFS, SIRI):** En el ámbito del transporte público, Open Data Euskadi no reinventa la rueda, sino que adopta estándares globales. La presencia de GTFS (General Transit Feed Specification) y GTFS-RT (Real-Time) [^6^] posiciona a Euskadi en la vanguardia de la interoperabilidad en movilidad, permitiendo que sus datos sean consumidos por planificadores de rutas globales como Google Maps, Apple Maps o Citymapper sin necesidad de adaptaciones ad hoc.

### 2.3 Web Semántica y Linked Open Data (LOD)

Un aspecto diferenciador de la estrategia de datos de Euskadi es su apuesta decidida por la Web Semántica. Más allá de las APIs REST convencionales, el portal ofrece un Punto SPARQL.[^3^] SPARQL es el lenguaje de consulta para bases de datos RDF (Resource Description Framework), el estándar del W3C para la web de datos enlazados.

La existencia de este punto de acceso [^8^] implica que una gran cantidad de datos del gobierno están modelados como grafos de conocimiento. Esto permite realizar consultas de una complejidad que sería imposible con una API REST tradicional. Por ejemplo, mientras que una API REST podría responder a "¿Qué subvenciones existen?", una consulta SPARQL bien formulada podría responder a "¿Qué subvenciones de cultura se han concedido en municipios de menos de 5.000 habitantes que también tengan un índice de desempleo superior al 10%?", cruzando datos de subvenciones, padrón municipal y estadísticas de empleo en una sola petición. Este nivel de "inteligencia" en el acceso al dato es un activo de incalculable valor para investigadores y analistas de políticas públicas.

### 2.4 Modelos de Seguridad y Autenticación

El análisis de la documentación revela una dicotomía en los modelos de seguridad. La mayoría de las APIs del catálogo (Turismo, Cultura, Tráfico básico) son de acceso abierto, no requiriendo autenticación o, a lo sumo, el uso de claves simples para el control de cuotas. Esto maximiza la reutilización y reduce las barreras de entrada para desarrolladores independientes y startups.

Sin embargo, servicios críticos como la API de Euskalmet (Meteorología) implementan modelos de seguridad robustos basados en JSON Web Tokens (JWT) y pares de claves pública/privada.[^10^] Este mecanismo, más complejo de implementar para el consumidor, garantiza la integridad del servicio y permite un control granular sobre quién accede a la infraestructura de sensores en tiempo real, protegiendo al gobierno contra ataques de denegación de servicio o abusos de infraestructura en sistemas de alta demanda.

## 3. Auditoría Exhaustiva del Catálogo de APIs por Sector

A continuación, se presenta el análisis detallado de las interfaces disponibles, clasificadas por su dominio funcional. Este inventario no se limita a listar los servicios, sino que profundiza en la tipología de datos expuestos y su utilidad práctica.

### 3.1 Dominio de Medio Ambiente y Meteorología

Este sector presenta la mayor densidad y frecuencia de actualización de datos, impulsado por la necesidad de monitorización ambiental constante.

#### 3.1.1 API de Euskalmet (Agencia Vasca de Meteorología)

Esta es una de las APIs más sofisticadas del catálogo. No se trata de un simple servicio de previsión, sino de una pasarela a la red de observación hidrometeorológica del País Vasco.

*   **Datos Expuestos:**
    *   **Observación en Tiempo Real:** Acceso a lecturas diezmiltales (cada 10 minutos) de estaciones automáticas. Parámetros: temperatura, humedad, precipitación, velocidad y dirección del viento, irradiancia solar.[^11^]
    *   **Predicción:** Pronósticos estructurados por zonas geográficas y franjas horarias, esenciales para la planificación ciudadana y sectorial (agricultura, pesca).[^11^]
    *   **Radar y Rayos:** Datos de teledetección que permiten visualizar células tormentosas y descargas eléctricas.[^13^]
    *   **Oceanografía:** Datos de boyas costeras (altura de ola, periodo, temperatura del mar) vitales para la seguridad marítima y el turismo de costa.[^11^]
*   **Aspectos Técnicos:** Requiere la generación de un token JWT firmado, lo que implica una implementación criptográfica en el cliente. La estructura de respuesta es jerárquica, organizando la información por Station -> Sensor -> Measurement.[^10^]

#### 3.1.2 API de Calidad del Aire

Gestionada por el Departamento de Medio Ambiente, esta API es crucial para la salud pública.

*   **Datos Expuestos:** Datos horarios validados y provisionales de la Red de Control de Calidad del Aire. Incluye contaminantes criterio: Dióxido de Azufre (SO2), Óxidos de Nitrógeno (NO/NO2), Ozono (O3), Monóxido de Carbono (CO) y Partículas (PM10 y PM2.5).[^14^]
*   **Funcionalidad:** Permite consultar el Índice de Calidad del Aire (ICA) calculado, así como los valores brutos de concentración. La granularidad permite análisis por estación o por municipio.
*   **Relevancia:** La disponibilidad de estos datos en formato JSON/REST [^2^] facilita su integración en paneles de control de ciudades inteligentes (Smart Cities) para activar protocolos de contaminación.

#### 3.1.3 API de Mediciones de Polen

Un servicio especializado del Departamento de Salud.

*   **Datos Expuestos:** Recuentos de granos de polen por metro cúbico de aire, desagregados por taxones vegetales (Gramíneas, Urticáceas, Cupresáceas, etc.).[^15^]
*   **Cobertura:** Estaciones en las capitales vascas.
*   **Utilidad:** Fundamental para aplicaciones de salud (mHealth) orientadas a pacientes alérgicos, permitiendo correlacionar síntomas con niveles de exposición ambiental.

#### 3.1.4 API de Aguas (Consumo y Masas de Agua)

*   **Aguas de Consumo:** Monitoriza la calidad del agua en el punto de entrega (grifo) y redes de distribución, asegurando el cumplimiento de normativas sanitarias.[^2^]
*   **Masas de Agua:** Proporciona datos sobre el estado ecológico de ríos, embalses y estuarios, gestionados por URA (Agencia Vasca del Agua).[^19^]
*   **Playas:** Aunque a menudo se consumen como ficheros, existen servicios que informan sobre el estado sanitario de las playas y la bandera (condiciones de baño) durante la temporada estival.[^21^]

### 3.2 Dominio de Movilidad y Transporte

Euskadi ha realizado una fuerte inversión en la digitalización del transporte, reflejada en su oferta de APIs.

#### 3.2.1 API de Tráfico

Gestionada por el Departamento de Seguridad, es vital para la gestión operativa de la red viaria.

*   **Incidencias:** Expone eventos en tiempo real como accidentes, obras, hielo/nieve, o retenciones. Cada incidencia incluye metadatos ricos: tipo, causa, nivel de servicio, coordenadas geográficas precisas y sentido de la afectación.[^23^]
*   **Flujos (Flows) y Aforadores:** Datos cuantitativos de tráfico procedentes de espiras electromagnéticas en la calzada. Miden intensidad (vehículos/hora), ocupación (%) y velocidad media. Esto permite calcular tiempos de viaje dinámicos.[^23^]
*   **Cámaras:** Enlaces a las imágenes de las cámaras de tráfico, permitiendo la verificación visual del estado de las carreteras.[^23^]

#### 3.2.2 Moveuskadi (Planificador y Datos de Transporte Público)

Representa la agregación de datos de múltiples operadores de transporte público.

*   **Estándares GTFS:** Publicación de los horarios planificados, rutas y paradas de operadores como Euskotren, Metro Bilbao, Tranvías y autobuses forales en formato estándar de Google.[^6^]
*   **Tiempo Real (GTFS-RT / SIRI):** Acceso a la posición de vehículos y predicciones de llegada en tiempo real. Esto es crítico para aplicaciones de usuario final que necesitan saber "cuándo llega mi autobús" con precisión de minutos.[^6^]
*   **Datos de TUVISA:** El transporte urbano de Vitoria-Gasteiz se integra también ofreciendo datos de posicionamiento de autobuses en tiempo real.[^27^]

### 3.3 Dominio Socioeconómico y Cultural

#### 3.3.1 API de Contratación Pública

Un pilar de la transparencia administrativa.

*   **Datos Expuestos:** Perfiles de contratante, licitaciones abiertas, adjudicaciones y formalizaciones de contratos. Incluye detalles sobre importes, empresas adjudicatarias y plazos.[^28^]
*   **Utilidad:** Permite a las empresas monitorizar oportunidades de negocio con la administración y a la sociedad civil fiscalizar el gasto público.

#### 3.3.2 API de Eventos Culturales (Kulturklik)

Agregador de la agenda cultural de Euskadi.

*   **Datos Expuestos:** Eventos de música, teatro, danza, exposiciones, etc., categorizados y geolocalizados. La API permite filtrar por fecha, tipo de evento y territorio.[^30^]
*   **Valor:** Al centralizar la oferta de múltiples administraciones y promotores, se convierte en la fuente de verdad para agendas culturales digitales.

#### 3.3.3 API de Turismo y Recursos Turísticos

*   **Recursos:** Inventario geolocalizado de puntos de interés turístico: museos, patrimonio arquitectónico, oficinas de turismo, playas y espacios naturales.[^5^]
*   **Alojamientos y Restauración:** Directorio completo de hoteles, casas rurales, campings, restaurantes, sidrerías y bares de pintxos. Incluye datos de contacto, categoría, capacidad y ubicación precisa (GeoJSON).[^33^]

#### 3.3.4 APIs de Estadística (Eustat y Udalmap)

*   **Banco de Datos de Eustat:** Permite la extracción programática de series estadísticas oficiales (PIB, demografía, industria). Su API facilita la integración de datos macroeconómicos en cuadros de mando empresariales.[^36^]
*   **Udalmap:** Ofrece una batería de indicadores de sostenibilidad municipal. Es una herramienta clave para el benchmarking territorial, permitiendo comparar el desempeño de diferentes municipios en áreas como economía, cohesión social y medio ambiente.[^38^]

### 3.4 Otros Servicios Relevantes

*   **Boletín Oficial del País Vasco (BOPV):** Acceso estructurado a las disposiciones normativas y anuncios oficiales, facilitando la automatización de servicios de alerta legal.[^2^]
*   **Euskadi Aktiboa:** Aunque se presenta como conjunto de datos, su integración en servicios de salud [^40^] sugiere su uso como API para localizar activos de salud (parques, asociaciones, centros comunitarios) que promueven estilos de vida saludables.

## 4. Arquitectura de Soluciones: Propuestas de Aplicación y Casos de Uso

A partir de la auditoría técnica realizada, se identifican oportunidades claras para el desarrollo de soluciones de alto valor añadido. La clave de estas propuestas reside en la fusión de datos (Data Fusion), combinando fuentes dispares para generar nueva inteligencia que no existe en los datos aislados.

**Tabla 3: Matriz de Integración de Datos para Casos de Uso**

| Caso de Uso Propuesto | Fuentes de Datos Primarias (APIs) | Fuentes de Datos Secundarias/Contexto | Valor Generado |
| :--- | :--- | :--- | :--- |
| 1. Eco-Navegación Saludable | Calidad Aire [^14^], Polen [^16^], Moveuskadi [^6^] | Tráfico [^23^], Euskalmet [^11^] | Rutas optimizadas por salud respiratoria. |
| 2. Inteligencia Inmobiliaria/HORECA | Turismo (Restaurantes) [^34^], Udalmap [^38^] | Tráfico (Flujos) [^23^], Kulturklik [^30^] | Análisis de viabilidad de nuevos negocios. |
| 3. Gestión de Riesgos Hídricos | Euskalmet (Precipitación) [^11^], Aguas (Masas) [^20^] | Tráfico (Incidencias) [^24^], NORA | Alerta temprana de inundaciones en viales. |
| 4. Monitor de Oportunidades Públicas | Contratación [^28^], BOPV [^2^] | Directorio Empresas (Empresas) | Alertas de licitación personalizadas con IA. |
| 5. Prescripción Social de Activos | Euskadi Aktiboa [^40^], Moveuskadi [^26^] | Kulturklik [^30^], Directorio Centros | Conexión sistema sanitario-comunidad. |

### Caso de Uso 1: Plataforma de Movilidad Personal Saludable ("BreatheSafe Euskadi")

*   **Problema:** Los planificadores de rutas actuales (Google Maps, etc.) optimizan por tiempo o distancia, ignorando factores ambientales que afectan a poblaciones vulnerables (asmáticos, alérgicos, niños, ancianos).
*   **Descripción de la Solución:** Una aplicación móvil de enrutamiento multimodal que sugiere trayectos minimizando la exposición a contaminantes y alérgenos.
*   **Arquitectura de Datos e Integración:**
    *   **Capa de Calidad del Aire:** La aplicación consulta horariamente la API de Calidad del Aire.[^14^] Mediante algoritmos de interpolación espacial (como Kriging o IDW), estima los niveles de NO2 y PM2.5 en cualquier punto del mapa, no solo en la estación de medición.
    *   **Capa de Alérgenos:** Durante la temporada primaveral, se consulta la API de Polen.[^16^] Si el usuario indica alergia a las gramíneas, el sistema penaliza las rutas que atraviesan zonas verdes grandes cuando los niveles son altos.
    *   **Capa de Movilidad:** Se utiliza Moveuskadi (GTFS/SIRI) [^6^] para calcular rutas en transporte público. Se prioriza el transporte subterráneo (Metro) sobre el autobús o caminar en días de alta contaminación superficial.
    *   **Capa Predictiva:** Se integra Euskalmet.[^11^] Si hay previsión de inversión térmica (que atrapa la contaminación) o viento fuerte (que dispersa polen), el algoritmo ajusta las recomendaciones.
*   **Valor Diferencial:**
    *   Empoderamiento del ciudadano para gestionar su salud preventiva.
    *   Reducción de crisis asmáticas y costes sanitarios asociados.

### Caso de Uso 2: Herramienta de Inteligencia de Localización para Inversores ("Gastro-Market Insight")

*   **Problema:** Los emprendedores del sector hostelería y turismo a menudo eligen ubicaciones para nuevos negocios basándose en la intuición en lugar de datos objetivos sobre demanda y competencia.
*   **Descripción de la Solución:** Un cuadro de mando B2B (Business-to-Business) que analiza la idoneidad de locales comerciales para hostelería basándose en datos demográficos, competencia y flujos de personas.
*   **Arquitectura de Datos e Integración:**
    *   **Análisis de Oferta:** Se descarga y geolocaliza la totalidad de Restaurantes, Bares y Cafeterías desde la API de Turismo.[^34^] Se generan mapas de calor de densidad de competidores.
    *   **Perfilado de Demanda (Estática):** Se utiliza la API de Udalmap y Eustat [^37^] para obtener la renta per cápita, densidad de población y pirámide de edad a nivel de barrio o sección censal.
    *   **Perfilado de Demanda (Dinámica):** Se integran los datos de Flujos de Tráfico [^23^] y la cercanía a paradas de transporte público (Moveuskadi) para estimar la accesibilidad y el tránsito de personas en la zona.
    *   **Generadores de Tráfico:** Se cruza con la API de Kulturklik [^30^] y Recursos Turísticos [^5^] para identificar zonas con alta afluencia de ocio (museos, teatros) que generan clientes potenciales para restaurantes cercanos.
*   **Valor Diferencial:**
    *   Minimización del riesgo de inversión.
    *   Identificación de "océanos azules" (zonas con alta demanda potencial y baja oferta).

### Caso de Uso 3: Sistema de Gestión de Resiliencia de Infraestructuras Críticas

*   **Problema:** Los eventos meteorológicos extremos son cada vez más frecuentes. La gestión de emergencias requiere correlacionar la causa (clima) con el efecto (infraestructura) en tiempo real.
*   **Descripción de la Solución:** Un sistema de alerta temprana para protección civil y mantenimiento de carreteras que predice y detecta incidencias en infraestructuras basándose en datos hidrometeorológicos.
*   **Arquitectura de Datos e Integración:**
    *   **Monitorización de la Amenaza:** Consumo continuo de la API de Euskalmet [^11^] (Precipitación acumulada, Avisos de viento/nieve) y datos de radar.[^13^]
    *   **Impacto en Viabilidad:** Correlación en tiempo real con la API de Incidencias de Tráfico.[^24^] El sistema aprende qué intensidades de lluvia provocan históricamente balsas de agua o accidentes en puntos kilométricos específicos.
    *   **Riesgo Hidrológico:** Integración de la API de Masas de Agua [^20^] para monitorizar el nivel de los ríos. Si un río supera el umbral de alerta y hay una carretera adyacente (cruce espacial con NORA/GeoEuskadi), se emite una alerta automática de posible desbordamiento sobre la vía.
    *   **Respuesta Automatizada:** El sistema podría sugerir desvíos de tráfico automáticamente o pre-alertar a los equipos de bomberos más cercanos.
*   **Valor Diferencial:**
    *   Transición de una gestión reactiva a una proactiva.
    *   Mejora en los tiempos de respuesta y salvaguarda de vidas humanas y bienes materiales.

### Caso de Uso 4: Asistente Legal Inteligente para Contratación Pública

*   **Problema:** Las PYMEs a menudo pierden oportunidades de negocio con la administración por la dificultad de monitorizar diariamente los múltiples perfiles de contratante y boletines.
*   **Descripción de la Solución:** Un servicio de suscripción que utiliza Procesamiento de Lenguaje Natural (NLP) sobre los datos de contratación para alertar a las empresas de oportunidades relevantes.
*   **Arquitectura de Datos e Integración:**
    *   **Ingesta de Datos:** Consumo diario de la API de Contratación Pública [^28^] y la API del BOPV.[^2^]
    *   **Análisis Semántico:** En lugar de buscar solo por códigos CPV (que a menudo son genéricos), el sistema analiza el texto de los pliegos y descripciones (extraídos de los enlaces en la API) para entender la naturaleza real del contrato.
    *   **Perfilado de Proveedores:** Uso de datos históricos de adjudicaciones [^28^] para identificar qué empresas suelen ganar qué tipo de concursos (inteligencia competitiva).
    *   **Matching:** Cruzar las oportunidades detectadas con el perfil de la empresa usuaria y enviar alertas personalizadas.
*   **Valor Diferencial:**
    *   Democratización del acceso a la contratación pública.
    *   Aumento de la concurrencia competitiva en las licitaciones, lo que puede resultar en mejores ofertas para la administración.

### Caso de Uso 5: Plataforma de Prescripción Social y Activos de Salud ("Euskadi Aktiboa Digital")

*   **Problema:** El sistema sanitario busca promover estilos de vida saludables, pero los médicos carecen de herramientas integradas para "recetar" actividades comunitarias concretas.
*   **Descripción de la Solución:** Una herramienta digital que conecta los Centros de Salud con los recursos comunitarios, facilitando la prescripción de "activos de salud" en lugar de medicamentos.
*   **Arquitectura de Datos e Integración:**
    *   **Inventario de Activos:** La base es el dataset/API de Euskadi Aktiboa [^40^], que lista recursos como grupos de caminata, asociaciones de vecinos, parques biosaludables, etc.
    *   **Agenda Dinámica:** Enriquecimiento con la API de Eventos (Kulturklik) [^30^] y agendas deportivas locales para que la recomendación no sea solo un lugar ("vaya al parque"), sino una actividad concreta ("únase al grupo de tai-chi mañana a las 10:00").
    *   **Accesibilidad:** Integración con Moveuskadi [^26^] para asegurar que el activo recomendado es accesible para el paciente (ej. personas mayores sin coche) mediante transporte público.
    *   **Accesibilidad Física:** Uso de datos de orografía o accesibilidad urbana (si disponibles en GeoEuskadi) para garantizar que la ruta es apta para personas con movilidad reducida.
*   **Valor Diferencial:**
    *   Integración efectiva de la salud comunitaria en la atención primaria.
    *   Promoción de la equidad en salud facilitando el acceso a recursos a poblaciones desfavorecidas.

## 5. Desafíos Técnicos y Recomendaciones de Implementación

Si bien el potencial es inmenso, la implementación de estas soluciones enfrenta desafíos técnicos que deben ser abordados.

### 5.1 Gestión de Latencia y Caché

APIs como la de tráfico o Euskalmet se actualizan con frecuencias altas (minutos). Una aplicación con miles de usuarios no debe consultar la API original por cada usuario. Es imperativo implementar una capa intermedia (Middleware) que consulte la API gubernamental, almacene el resultado en una caché (tipo Redis) y sirva los datos a los usuarios finales. Esto protege la infraestructura pública y mejora la velocidad de respuesta de la App.

### 5.2 Homogeneización Semántica

Aunque existen estándares, a menudo hay discrepancias semánticas. Por ejemplo, una "incidencia" en la API de tráfico y una "afección" en la API de transporte público pueden referirse al mismo evento físico (un accidente que corta una calle por donde pasa el autobús). Los integradores deben desarrollar lógica difusa (fuzzy logic) o geo-coincidencia para desduplicar estos eventos.

### 5.3 Privacidad y Ética

En el uso de cámaras de tráfico o datos de movilidad, aunque los datos de origen sean anónimos, el cruce de múltiples fuentes podría teóricamente re-identificar patrones. Los desarrolladores deben adherirse a principios de Privacy by Design, especialmente al tratar datos de salud o patrones de movimiento.

### 5.4 Mantenimiento de Claves y Seguridad

Para servicios como Euskalmet que usan JWT, es crucial automatizar la renovación de tokens. Un fallo en la renovación automática podría dejar a una aplicación de gestión de emergencias "ciega" en el momento más crítico. Se recomienda implementar sistemas de monitoreo (heartbeat) que verifiquen continuamente la validez de las credenciales y la disponibilidad del endpoint.

## 6. Conclusión

La investigación confirma que Open Data Euskadi ha superado la etapa de portal de transparencia para convertirse en una infraestructura digital crítica. La disponibilidad de APIs estructuradas en dominios clave (Meteo, Tráfico, Medio Ambiente) habilita el desarrollo de una nueva generación de servicios digitales.

Las propuestas presentadas demuestran que el valor real no reside en el dato individual, sino en la capacidad de orquestar múltiples APIs para responder a preguntas complejas. La implementación de casos de uso como "BreatheSafe Euskadi" o "Gastro-Market Insight" no solo es técnicamente viable con los recursos actuales, sino que representa una oportunidad para alinear la innovación tecnológica con el bienestar social y el desarrollo económico del territorio.

Para maximizar este impacto, se recomienda al Gobierno Vasco continuar la senda de la "APIficación" de sus datos, extendiendo estos servicios dinámicos a áreas aún dependientes de ficheros estáticos (como vivienda o educación) y fomentando, mediante hackathones o programas de aceleración, que el ecosistema de desarrolladores locales transforme estos datos brutos en soluciones de valor para la ciudadanía.

---
## Obras citadas

[^1^]: [Catalogo de datos de Open Data Euskadi - Euskadi.eus](https://opendata.euskadi.eus/catalogo-datos/), fecha de acceso: enero 18, 2026
[^2^]: [APIs de Open Data Euskadi](https://opendata.euskadi.eus/apis/-/apis-open-data/), fecha de acceso: enero 18, 2026
[^3^]: [Catálogo de datos publicados en el portal de Open Data Euskadi](https://opendata.euskadi.eus/catalogo/-/catalogo-de-datos/), fecha de acceso: enero 18, 2026
[^4^]: [Catalogo de datos de Open Data Euskadi - Euskadi.eus](https://opendata.euskadi.eus/api/catalogo-datos-es/), fecha de acceso: enero 18, 2026
[^5^]: [Turismo - Catalogo de datos de Open Data Euskadi - Euskadi.eus](https://opendata.euskadi.eus/catalogo-datos/?r01kQry=tC%3Aeuskadi%3BtF%3Aopendata%3Bm%3AdocumentLanguage.EQ.es%2COpendataSource.LIKE.Turismo%3B), fecha de acceso: enero 18, 2026
[^6^]: [Transporte público - Catalogo de datos de Open Data Euskadi - Euskadi.eus](https://opendata.euskadi.eus/catalogo-datos/?r01kQry=tC%3Aeuskadi%3BtF%3Aopendata%3Bm%3AdocumentLanguage.EQ.es%2COpendataLabels.LIKE.Transporte+p%C3%BAblico%3B), fecha de acceso: enero 18, 2026
[^7^]: [Linked Open Data - Open Data Euskadi](https://opendata.euskadi.eus/lod/-/linked-open-data/), fecha de acceso: enero 18, 2026
[^8^]: [SPARQL endpoint GUI - Open Data Euskadi](https://opendata.euskadi.eus/lod/-/linked-open-data-sparql-endpoint-gui/), fecha de acceso: enero 18, 2026
[^9^]: [SPARQL endpoint as a service - Open Data Euskadi](https://opendata.euskadi.eus/lod/-/linked-open-data-sparql-endpoint-as-a-service/), fecha de acceso: enero 18, 2026
[^10^]: [How to use Meteo Rest Services - API Rest de datos meteorológicos de Euskalmet - Open Data Euskadi](https://opendata.euskadi.eus/api-euskalmet/-/how-to-use-meteo-rest-services/), fecha de acceso: enero 18, 2026
[^11^]: [API Rest de datos meteorológicos de Euskalmet - Open Data Euskadi](https://opendata.euskadi.eus/api-euskalmet/-/api-de-euskalmet/), fecha de acceso: enero 18, 2026
[^12^]: [Open data - Euskalmet | Agencia vasca de meteorología - Euskadi.eus](https://www.euskalmet.euskadi.eus/servicios/open-data/), fecha de acceso: enero 18, 2026
[^13^]: [API Rest de datos meteorológicos de Euskalmet - Open Data Euskadi](https://opendata.euskadi.eus/api-euskalmet/?api=radar), fecha de acceso: enero 18, 2026
[^14^]: [API Rest de Calidad del aire - Open Data Euskadi](https://opendata.euskadi.eus/api-air-quality/?api=air-quality), fecha de acceso: enero 18, 2026
[^15^]: [Dos nuevas APIs de datos abiertos: Calidad del aire y mediciones del polen](https://opendata.euskadi.eus/comunidad-open-data/-/2023/dos-nuevas-apis-de-datos-abiertos-calidad-del-aire-y-mediciones-del-polen/), fecha de acceso: enero 18, 2026
[^16^]: [API Rest del polen - Open Data Euskadi](https://opendata.euskadi.eus/api-pollen/?api=pollen), fecha de acceso: enero 18, 2026
[^17^]: [Calidad de aguas de consumo de Euskadi durante el 2026 - datos.gob.es](https://datos.gob.es/es/catalogo/a16003011-calidad-de-aguas-de-consumo-de-euskadi-durante-el-2026), fecha de acceso: enero 18, 2026
[^18^]: [API Rest de Aguas de consumo - Open Data Euskadi](https://opendata.euskadi.eus/api-drinking-water/?api=drinkingwater-quality), fecha de acceso: enero 18, 2026
[^19^]: [Catalogo de datos de Open Data Euskadi - Euskadi.eus](https://opendata.euskadi.eus/catalogo-datos), fecha de acceso: enero 18, 2026
[^20^]: [Dos nuevas APIs de datos abiertos: Calidad de masas de aguas y aguas de consumo - Open Data Euskadi](https://opendata.euskadi.eus/comunidad-open-data/-/noticia/2024/dos-nuevas-apis-de-datos-abiertos-calidad-de-masas-de-aguas-y-aguas-de-consumo/), fecha de acceso: enero 18, 2026
[^21^]: [Playas de Euskadi - Conjunto de datos de Open Data Euskadi](https://opendata.euskadi.eus/catalogo/-/playas-de-euskadi/), fecha de acceso: enero 18, 2026
[^22^]: [Euskadiko hondartzen osasun-egoera 2025ean - data.europa.eu](https://data.europa.eu/data/datasets/https-opendata-euskadi-eus-catalogo-estado-sanitario-de-las-playas-de-euskadi-2025-), fecha de acceso: enero 18, 2026
[^23^]: [API Rest de tráfico - Euskadi.eus](https://opendata.euskadi.eus/api-traffic/?api=traffic), fecha de acceso: enero 18, 2026
[^24^]: [Incidencias del tráfico en tiempo real en Euskadi - Turismo](https://www.euskadi.eus/incidencias-trafico-euskadi/web01-a2turism/es/), fecha de acceso: enero 18, 2026
[^25^]: [Dataset - CKAN](https://data.ctb.eus/en/dataset?res_format=GTFS&tags=Diputaci%C3%B3n+Foral+de+Bizkaia), fecha de acceso: enero 18, 2026
[^26^]: [Moveuskadi. Datos de la red de transporte público de Euskadi: operadores, horarios, paradas, calendario, tarifas, etc.](https://opendata.euskadi.eus/catalogo/-/moveuskadi-datos-de-la-red-de-transporte-publico-de-euskadi-operadores-horarios-paradas-calendario-tarifas-etc/), fecha de acceso: enero 18, 2026
[^27^]: [Información en tiempo real de los autobuses de TUVISA - Open Data Euskadi](https://opendata.euskadi.eus/catalogo/contenidos/ds_rrhh/aabp107kaaaaaacyuaac/es_def/index.shtml), fecha de acceso: enero 18, 2026
[^28^]: [API Rest de Contrataciones Públicas - Open Data Euskadi](https://opendata.euskadi.eus/webopd00-apicontract/es/?api=procurements), fecha de acceso: enero 18, 2026
[^29^]: [Contrataciones Administrativas del 2025 - Conjunto de datos de Open Data Euskadi](https://opendata.euskadi.eus/catalogo/-/contrataciones-administrativas-del-2025/), fecha de acceso: enero 18, 2026
[^30^]: [API Rest de eventos culturales (Kulturklik) - Open Data Euskadi](https://opendata.euskadi.eus/api-culture/), fecha de acceso: enero 18, 2026
[^31^]: [Agenda Cultural - Eventos del 2025 - Conjunto de datos - Datos.gob.es](https://datos.gob.es/es/catalogo/a16003011-agenda-cultural-eventos-del-2025), fecha de acceso: enero 18, 2026
[^32^]: [Recursos turísticos de que dispone Euskadi para los negocios](https://opendata.euskadi.eus/catalogo/-/recursos-turisticos-de-euskadi-para-los-negocios/), fecha de acceso: enero 18, 2026
[^33^]: [Alojamientos turísticos de Euskadi - Conjunto de datos de Open Data Euskadi](https://opendata.euskadi.eus/catalogo/-/alojamientos/), fecha de acceso: enero 18, 2026
[^34^]: [Catalogo de datos de Open Data Euskadi - Euskadi.eus](https://opendata.euskadi.eus/catalogo-datos/?r01kQry=tC%3Aeuskadi%3BtF%3Aopendata%3Bm%3AdocumentLanguage.EQ.es%2COpendataLabels.LIKE.restaurantes%3B), fecha de acceso: enero 18, 2026
[^35^]: [Restaurantes, asadores y sidrerías de Euskadi](https://opendata.euskadi.eus/catalogo/-/restaurantes-asadores-y-sidrerias-de-euskadi/), fecha de acceso: enero 18, 2026
[^36^]: [Datu Bankua: API laguntza - Eustat](https://www.eustat.eus/API_bankua_laguntza.html), fecha de acceso: enero 18, 2026
[^37^]: [Eustaten OpenAPI](https://www.eustat.eus/openapi/openapi.html), fecha de acceso: enero 18, 2026
[^38^]: [Indicadores municipales de sostenibilidad: Contenedores para la recogida de residuos domesticos ( ‰ habitantes ) - datos.gob.es](https://datos.gob.es/es/catalogo/a16003011-indicadores-municipales-de-sostenibilidad-contenedores-para-la-recogida-de-residuos-domesticos-x2030-habitantes1), fecha de acceso: enero 18, 2026
[^39^]: [rdf](https://www.avpd.eus/contenidos/estadistica/udalmap_indicador_145/es_def/r01DCATDataset.rdf), fecha de acceso: enero 18, 2026
[^40^]: [Euskadi Aktiboa: actividades relacionadas con la salud y la vida ...](https://opendata.euskadi.eus/catalogo/-/euskadi-aktiboa-actividades-relacionadas-con-la-salud-y-la-vida-saludable/), fecha de acceso: enero 18, 2026