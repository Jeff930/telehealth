import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
})
export class QuoteCardComponent implements OnInit {

  bible_verses: any[];
  title: string;
  content: string;

  constructor() {

   }

  ngOnInit() {
    this.bible_verses = [
      {"chapter": "Romans 12:12", "verse": "Be joyful in hope, patient in affliction, faithful in prayer."},
      {"chapter": "Philippians 4:13", "verse": "I can do all things through him who strengthens me."}, 
      {"chapter": "Psalm 143:8", "verse": "Let the morning bring me word of your unfailing love, for I have put my trust in you. Show me the way I should go, for to you I entrust my life."},
      {"chapter": "2 Corinthians 5:17", "verse": "Old things are passed away; behold, all things are become new. "},
      {"chapter": "Isaiah 40:29", "verse": "He gives power to the weak and strength to the powerless."},
      {"chapter": "Psalm 30:5", "verse": "For his anger lasts only a moment, but his favor lasts a lifetime; weeping may stay for the night, but rejoicing comes in the morning."},
      {"chapter": "Isaiah 66:13", "verse": "As a mother comforts her child, so I will comfort you; in Jerusalem you shall find your comfort."},
      {"chapter": "Exodus 14:13", "verse": "Don’t be afraid Just stand still and watch the Lord rescue you today The Lord himself will fight for you Just stay calm."},
      {"chapter": "1 Peter 5:7", "verse": "Cast all your anxiety on him because he cares for you."},
      {"chapter": "Matthew 17:20", "verse": "Our faith can move mountains."},
      {"chapter": "John 4:18", "verse": "There is no fear in love; for perfect love casteth out fear. "},
      {"chapter": "2 Timothy 1:7", "verse": "For God gave us a spirit not of fear but of power and love and self-control."},
      {"chapter": "Joshua 1:9", "verse": "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."},
      {"chapter": "2 Timothy 4:17", "verse": "But the Lord stood with me and gave me strength. "},
      {"chapter": "Jeremiah 29:11", "verse": "For I know the plans I have for you … plans to prosper you and not to harm you, plans to give you hope and a future."},
      {"chapter": "Psalm 138:3", "verse": "On the day I called, you answered me: my strength of soul you increased."},
    ];

    this.getBibleVerseDay();
  }

  getBibleVerseDay(){
    var randomItem = this.bible_verses[Math.floor(Math.random() * this.bible_verses.length)];
    this.title = randomItem.chapter;
    this.content = randomItem.verse;
  }
}
