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
      {"chapter": "Psalm 46:1", "verse": "God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear."},
      {"chapter": "James 1:5", "verse": "Any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you."},
      {"chapter": "Psalm 31:25", "verse": "Be strong and take heart, all who hope in the Lord."},
      {"chapter": "Matthew 13:43", "verse": "Then shall the righteous shine forth as the sun in the kingdom of the Father."},
      {"chapter": "Psalm 5:3", "verse": "In the morning, Lord, you hear my voice; in the morning  I lay my requests before you and wait expectantly. "},
      {"chapter": "1 Peter 4:8", "verse": "And above all things have fervent love for one another, for love will cover a multitude of sins."},
      {"chapter": "Psalm 34:10b", "verse": "Those who seek the Lord lack no good thing."},
      {"chapter": "1 Chronicles 16:11", "verse": "Seek the lord and his strength: seek his presence continually!"},
      {"chapter": "Corinthians 13:13", "verse": "And now these three remain: faith, hope, and love. But the greatest of these is love."},
      {"chapter": "Galatians 5:22-23", "verse": "The fruit of the spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness, and self-control."},
      {"chapter": "Psalm 143:8", "verse": "Let the morning bring me word of your unfailing love, for I have put my trust in you. Show me the way I should go, for to you I entrust my life. "},
      {"chapter": "Matthew 11:28", "verse": "Come to me, all who labor and are heavy laden, and I will give you rest. "},
      {"chapter": "Isaiah 61:11", "verse": "His righteousness will be like a garden in early spring, with plants springing up everywhere."},
      {"chapter": "Ecclesiastes 4:9-10", "verse": "Two are better than one … for if they fall, one will lift up the other."},
    ];

    this.getBibleVerseDay();
  }

  getBibleVerseDay(){
    var randomItem = this.bible_verses[Math.floor(Math.random() * this.bible_verses.length)];
    this.title = randomItem.chapter;
    this.content = randomItem.verse;
  }
}
