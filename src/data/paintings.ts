// Background paintings: one is picked at random on every page load.
// Fifty well known public domain works (artists who died before 1955),
// from Van Gogh and Monet to Hokusai, Vermeer, Klimt and Kandinsky.
import p_starry_night from '../assets/paintings/starry-night.webp';
import p_wheat_field_with_cypresses from '../assets/paintings/wheat-field-with-cypresses.webp';
import p_irises from '../assets/paintings/irises.webp';
import p_olive_trees_yellow_sky from '../assets/paintings/olive-trees-yellow-sky.webp';
import p_mulberry_tree from '../assets/paintings/mulberry-tree.webp';
import p_langlois_bridge from '../assets/paintings/langlois-bridge.webp';
import p_harvest_la_crau from '../assets/paintings/harvest-la-crau.webp';
import p_the_sower from '../assets/paintings/the-sower.webp';
import p_green_wheat_field_cypress from '../assets/paintings/green-wheat-field-cypress.webp';
import p_white_orchard from '../assets/paintings/white-orchard.webp';
import p_mona_lisa from '../assets/paintings/mona-lisa.webp';
import p_girl_with_a_pearl_earring from '../assets/paintings/girl-with-a-pearl-earring.webp';
import p_the_night_watch from '../assets/paintings/the-night-watch.webp';
import p_impression_sunrise from '../assets/paintings/impression-sunrise.webp';
import p_the_kiss from '../assets/paintings/the-kiss.webp';
import p_bal_du_moulin_de_la_galette from '../assets/paintings/bal-du-moulin-de-la-galette.webp';
import p_the_milkmaid from '../assets/paintings/the-milkmaid.webp';
import p_view_of_delft from '../assets/paintings/view-of-delft.webp';
import p_a_sunday_afternoon_on_the_island_of_la_grande_ja from '../assets/paintings/a-sunday-afternoon-on-the-island-of-la-grande-ja.webp';
import p_the_ninth_wave from '../assets/paintings/the-ninth-wave.webp';
import p_portrait_of_adele_bloch_bauer_i from '../assets/paintings/portrait-of-adele-bloch-bauer-i.webp';
import p_the_tempest from '../assets/paintings/the-tempest.webp';
import p_the_swing from '../assets/paintings/the-swing.webp';
import p_ophelia from '../assets/paintings/ophelia.webp';
import p_the_astronomer from '../assets/paintings/the-astronomer.webp';
import p_the_storm_on_the_sea_of_galilee from '../assets/paintings/the-storm-on-the-sea-of-galilee.webp';
import p_luncheon_of_the_boating_party from '../assets/paintings/luncheon-of-the-boating-party.webp';
import p_morning_in_a_pine_forest from '../assets/paintings/morning-in-a-pine-forest.webp';
import p_the_hay_wain from '../assets/paintings/the-hay-wain.webp';
import p_a_young_girl_reading from '../assets/paintings/a-young-girl-reading.webp';
import p_the_sleeping_gypsy from '../assets/paintings/the-sleeping-gypsy.webp';
import p_rain_steam_and_speed_the_great_western_railway from '../assets/paintings/rain-steam-and-speed-the-great-western-railway.webp';
import p_garden_at_sainte_adresse from '../assets/paintings/garden-at-sainte-adresse.webp';
import p_woman_with_a_parasol_madame_monet_and_her_son from '../assets/paintings/woman-with-a-parasol-madame-monet-and-her-son.webp';
import p_women_in_the_garden from '../assets/paintings/women-in-the-garden.webp';
import p_the_embarkation_for_cythera from '../assets/paintings/the-embarkation-for-cythera.webp';
import p_the_lady_of_shalott from '../assets/paintings/the-lady-of-shalott.webp';
import p_the_goldfinch from '../assets/paintings/the-goldfinch.webp';
import p_nocturne_in_black_and_gold_the_falling_rocket from '../assets/paintings/nocturne-in-black-and-gold-the-falling-rocket.webp';
import p_composition_vii from '../assets/paintings/composition-vii.webp';
import p_blue_horse_i from '../assets/paintings/blue-horse-i.webp';
import p_lightnings_below_the_summit from '../assets/paintings/lightnings-below-the-summit.webp';
import p_kajikazawa_in_kai_province from '../assets/paintings/kajikazawa-in-kai-province.webp';
import p_lake_suwa_in_shinano_province from '../assets/paintings/lake-suwa-in-shinano-province.webp';
import p_naruto_whirlpools from '../assets/paintings/naruto-whirlpools.webp';
import p_the_sea_at_satta_in_suruga_province from '../assets/paintings/the-sea-at-satta-in-suruga-province.webp';
import p_moon_over_the_forest from '../assets/paintings/moon-over-the-forest.webp';
import p_sierra_storm from '../assets/paintings/sierra-storm.webp';
import p_bedroom_in_arles from '../assets/paintings/bedroom-in-arles.webp';
import p_almond_tree_in_blossom from '../assets/paintings/almond-tree-in-blossom.webp';

export interface Painting {
  src: string;
  title: string;
  artist: string;
  year: number;
}

export const PAINTINGS: Painting[] = [
  { src: p_starry_night, title: "The Starry Night", artist: "Vincent van Gogh", year: 1889 },
  { src: p_wheat_field_with_cypresses, title: "Wheat Field with Cypresses", artist: "Vincent van Gogh", year: 1889 },
  { src: p_irises, title: "Irises", artist: "Vincent van Gogh", year: 1889 },
  { src: p_olive_trees_yellow_sky, title: "Olive Trees with Yellow Sky and Sun", artist: "Vincent van Gogh", year: 1889 },
  { src: p_mulberry_tree, title: "The Mulberry Tree", artist: "Vincent van Gogh", year: 1889 },
  { src: p_langlois_bridge, title: "The Langlois Bridge at Arles", artist: "Vincent van Gogh", year: 1888 },
  { src: p_harvest_la_crau, title: "Harvest at La Crau", artist: "Vincent van Gogh", year: 1888 },
  { src: p_the_sower, title: "The Sower", artist: "Vincent van Gogh", year: 1888 },
  { src: p_green_wheat_field_cypress, title: "Green Wheat Field with Cypress", artist: "Vincent van Gogh", year: 1889 },
  { src: p_white_orchard, title: "The White Orchard", artist: "Vincent van Gogh", year: 1888 },
  { src: p_mona_lisa, title: "Mona Lisa", artist: "Leonardo da Vinci", year: 1503 },
  { src: p_girl_with_a_pearl_earring, title: "Girl with a Pearl Earring", artist: "Johannes Vermeer", year: 1665 },
  { src: p_the_night_watch, title: "The Night Watch", artist: "Rembrandt", year: 1642 },
  { src: p_impression_sunrise, title: "Impression, Sunrise", artist: "Claude Monet", year: 1872 },
  { src: p_the_kiss, title: "The Kiss", artist: "Gustav Klimt", year: 1907 },
  { src: p_bal_du_moulin_de_la_galette, title: "Bal du moulin de la Galette", artist: "Pierre-Auguste Renoir", year: 1876 },
  { src: p_the_milkmaid, title: "The Milkmaid", artist: "Johannes Vermeer", year: 1660 },
  { src: p_view_of_delft, title: "View of Delft", artist: "Johannes Vermeer", year: 1661 },
  { src: p_a_sunday_afternoon_on_the_island_of_la_grande_ja, title: "A Sunday Afternoon on the Island of La Grande Jatte", artist: "Georges Seurat", year: 1884 },
  { src: p_the_ninth_wave, title: "The Ninth Wave", artist: "Ivan Aivazovsky", year: 1850 },
  { src: p_portrait_of_adele_bloch_bauer_i, title: "Portrait of Adele Bloch-Bauer I", artist: "Gustav Klimt", year: 1907 },
  { src: p_the_tempest, title: "The Tempest", artist: "Giorgione", year: 1506 },
  { src: p_the_swing, title: "The Swing", artist: "Jean-Honor\u00e9 Fragonard", year: 1767 },
  { src: p_ophelia, title: "Ophelia", artist: "John Everett Millais", year: 1851 },
  { src: p_the_astronomer, title: "The Astronomer", artist: "Johannes Vermeer", year: 1664 },
  { src: p_the_storm_on_the_sea_of_galilee, title: "The Storm on the Sea of Galilee", artist: "Rembrandt", year: 1633 },
  { src: p_luncheon_of_the_boating_party, title: "Luncheon of the Boating Party", artist: "Pierre-Auguste Renoir", year: 1880 },
  { src: p_morning_in_a_pine_forest, title: "Morning in a Pine Forest", artist: "Ivan Shishkin", year: 1889 },
  { src: p_the_hay_wain, title: "The Hay Wain", artist: "John Constable", year: 1821 },
  { src: p_a_young_girl_reading, title: "A Young Girl Reading", artist: "Jean-Honor\u00e9 Fragonard", year: 1770 },
  { src: p_the_sleeping_gypsy, title: "The Sleeping Gypsy", artist: "Henri Rousseau", year: 1897 },
  { src: p_rain_steam_and_speed_the_great_western_railway, title: "Rain, Steam and Speed \u2013 The Great Western Railway", artist: "J. M. W. Turner", year: 1843 },
  { src: p_garden_at_sainte_adresse, title: "Garden at Sainte-Adresse", artist: "Claude Monet", year: 1867 },
  { src: p_woman_with_a_parasol_madame_monet_and_her_son, title: "Woman with a Parasol \u2013 Madame Monet and Her Son", artist: "Claude Monet", year: 1875 },
  { src: p_women_in_the_garden, title: "Women in the Garden", artist: "Claude Monet", year: 1866 },
  { src: p_the_embarkation_for_cythera, title: "The Embarkation for Cythera", artist: "Jean-Antoine Watteau", year: 1717 },
  { src: p_the_lady_of_shalott, title: "The Lady of Shalott", artist: "John William Waterhouse", year: 1888 },
  { src: p_the_goldfinch, title: "The Goldfinch", artist: "Carel Fabritius", year: 1654 },
  { src: p_nocturne_in_black_and_gold_the_falling_rocket, title: "Nocturne in Black and Gold \u2013 The Falling Rocket", artist: "James McNeill Whistler", year: 1875 },
  { src: p_composition_vii, title: "Composition VII", artist: "Wassily Kandinsky", year: 1913 },
  { src: p_blue_horse_i, title: "Blue Horse I", artist: "Franz Marc", year: 1911 },
  { src: p_lightnings_below_the_summit, title: "Lightnings below the summit", artist: "Katsushika Hokusai", year: 1831 },
  { src: p_kajikazawa_in_kai_province, title: "Kajikazawa in Kai province", artist: "Katsushika Hokusai", year: 1831 },
  { src: p_lake_suwa_in_shinano_province, title: "Lake Suwa in Shinano province", artist: "Katsushika Hokusai", year: 1831 },
  { src: p_naruto_whirlpools, title: "Naruto Whirlpools", artist: "Utagawa Hiroshige", year: 1853 },
  { src: p_the_sea_at_satta_in_suruga_province, title: "The Sea at Satta in Suruga Province", artist: "Utagawa Hiroshige", year: 1858 },
  { src: p_moon_over_the_forest, title: "Moon over the Forest", artist: "Charles Warren Eaton", year: 1895 },
  { src: p_sierra_storm, title: "Sierra Storm", artist: "William Keith", year: 1880 },
  { src: p_bedroom_in_arles, title: "Bedroom in Arles", artist: "Vincent van Gogh", year: 1888 },
  { src: p_almond_tree_in_blossom, title: "Almond Tree in Blossom", artist: "Vincent van Gogh", year: 1888 },
];

// Avoid showing the same painting twice in a row across refreshes.
export const pickPainting = (): number => {
  let last = -1;
  try { last = Number(sessionStorage.getItem('lastPainting') ?? -1); } catch { /* ignore */ }
  let i = Math.floor(Math.random() * PAINTINGS.length);
  if (PAINTINGS.length > 1 && i === last) i = (i + 1 + Math.floor(Math.random() * (PAINTINGS.length - 1))) % PAINTINGS.length;
  try { sessionStorage.setItem('lastPainting', String(i)); } catch { /* ignore */ }
  return i;
};
