import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';
import { Country, Languages, Translation } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;
  public languages?: string;
  public translationsArray: { [key: string]: { official: string, common: string } } = {};
  // public translationArray: string[] = [];
  public consecutive?: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id})=> this.countriesService.searchCountryByAlphaCode( id ) ),
      )
      .subscribe( country => {
        // console.log({country});
        if (!country) {
          this.router.navigateByUrl('');
          return;
        }
        this.country = country;
        this.languages = this.formatLanguages(this.country.languages)
        // this.translationsArray = country.translations;
        this.translationsArray = this.convertTranslationsToArray(country.translations);
        console.log(this.translationsArray);
      })
  }

  formatLanguages(languages: Languages): string {
    return Object.values(languages).join(", ");
  }

  convertTranslationsToArray(translations: { [key: string]: Translation }): { [key: string]: { official: string, common: string } } {
    const translationMapping: { [key: string]: string } = {
      "ara": "arabe",
      "bre": "bretón",
      "ces": "checo",
      "cym": "galés",
      "deu": "alemán",
      "est": "estonio",
      "fin": "finlandés",
      "fra": "francés",
      "hrv": "croata",
      "hun": "húngaro",
      "ita": "italiano",
      "jpn": "japonés",
      "kor": "coreano",
      "nld": "holandés",
      "per": "persa",
      "pol": "polaco",
      "por": "portugués",
      "rus": "ruso",
      "slk": "eslovaco",
      "spa": "español",
      "srp": "serbio",
      "swe": "sueco",
      "tur": "turco",
      "urd": "urdu",
      "zho": "chino"
    };

    const convertedTranslations: { [key: string]: { official: string, common: string } } = {};

    Object.entries(translations).forEach(([key, value]) => {
      convertedTranslations[translationMapping[key]] = value;
    });

    return convertedTranslations;
  }


}
