Import verses, sections, passages and chapters from your preferred Bible into your Roam Research graph.

This extension requires an API key for API.Bible. You can sign up for free at https://scripture.api.bible/signup
Then, go to https://scripture.api.bible/admin/applications and create a new application. Complete as shown below to get an API key

<img width="1014" alt="image" src="https://github.com/user-attachments/assets/cd6c40e6-92d8-4639-86cb-b1c8f802f3eb" />

Copy the long alphanumeric key from https://scripture.api.bible/admin/applications and enter it into the settings for this extension in Roam Depot.

Then, select your preferred language. This will call the API.Bible api and retrieve a list of Bibles available in your language. Once the Preferred Bible Version dropdown appears, choose a Bible and Roam will import some basic information about that Bible for future use.

Not all Bible versions in the API have all Books and only some have Bible 'sections' - a series of verses that form a specific story. e.g. 

<img width="718" alt="image" src="https://github.com/user-attachments/assets/17dc035f-ab0e-4d07-9647-c0f0163b5041" />

You then have several options available to get scripture into your graph:
- Command Palette
  - Search Bible by string
    - this option will present a search modal and then search the text of your preferred Bible for that string. It will then present a list of options to choose from in another modal, and then import the text of that verse once you've decided.
      <img width="560" alt="image" src="https://github.com/user-attachments/assets/883bd1bb-3641-48ce-aa4d-719cf24b2b26" />
      <img width="1021" alt="image" src="https://github.com/user-attachments/assets/6791a566-bb39-42e6-8cbb-f8a44ba2ae75" />

  - Import Bible section
    - a long list of available sections for your Bible will appear. This isn't very user friendly, but perhaps some might prefer this option.
      <img width="905" alt="image" src="https://github.com/user-attachments/assets/07396cae-53d3-4e48-8355-fb93493fa390" />

  - Import Bible section by Chapter
    - this option allows you to choose sections from a specific chapter, which presents a much shorter dropdown list.
       
  - Search for and import a Bible section by title
    - this will allow you to enter a search string and will then check for sections matching that string.
      
  - Import a Bible passage or verse
    - this will allow to specify a verse or range of verses from a Book and Chapter to import
      <img width="748" alt="image" src="https://github.com/user-attachments/assets/9a853112-f715-43e9-b60e-450c8e67bb00" />
 
  - Import a random Bible verse
    - fairly obvious
   
- SmartBlock
  - is you have SmartBlocks installed, you can use the SmartBlock command <%IMPORTRANDOMVERSE%> and create a button for your daily template, for example.
 
Notes:
- as not all Bible versions in the API have sections defined, those Command Palette options will not work if you have chosen a Bible without sections.
