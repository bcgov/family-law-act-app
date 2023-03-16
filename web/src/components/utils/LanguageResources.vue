<template>
	<div class="mx-4 mb-5 mt-3">

		<h2 class="mb-0 text-primary">Translation Tools</h2>

		<p>
			The Google translation tool or other web or app-based translation tools can be used to translate 
			text or spoken language into many different languages. Web pages, PDF documents and other content 
			within this service can be translated by copying the web page, PDF or text into the tool.
		</p>

		<p>
			<b>The accuracy of the translation using these tools may vary.</b> The translations using these tools 
			should not be considered exact and should be used only as an approximation of the original 
			English language content.
		</p>

		<h2 class="mb-0 text-primary">Interpretation Services</h2>

		<p>
			Court Services Branch provides <b>free</b> spoken-language interpreters for people who do not speak 
			English and visual language interpreters for people who are deaf or hard of hearing <b>for all 
			family law court appearances.</b>
		</p>

		<p>
			You must find your own interpreter for most things that go on outside the courtroom. For example, 
			you may need an interpreter to help you:
			<ul>
				<li>Talk with court staff</li>
				<li>Fill out an application, reply or other court document</li>
				<li>Meet with a lawyer</li>
			</ul>
		</p>
		<p>
			Many people ask a friend or family member to interpret for them in 
			these situations. Some people hire a professional interpreter.
			Go to 
			<span @click="navigateToGuide" class="text-primary" > 
				How to find a professional interpreter?
			</span> for more information.
		</p>

		<p>
			A <a 
				target="_blank" 
				href="https://www2.gov.bc.ca/gov/content?id=E12512BAACDF45979AEF905033BE4CEA">
				Family Justice Centre
			</a> and 
			<a 
				target="_blank" 
				href="https://www2.gov.bc.ca/gov/content?id=4372A527CC574299A7C0C225496F154F">
				Justice Access Centre
			</a> 
			can arrange a <b>free</b> interpreter for meetings with a Family Justice Counsellor or 
			their other services.                 
		</p>

		<h3 class="mb-0 text-primary">How do I ask for an interpreter for a court appearance?</h3>

		<p>
			If you have a lawyer handling your case, tell them if you or a witness need an 
			interpreter. They will make the arrangements.
		</p>

		<p>
			If you don’t have a lawyer and need an interpreter or will be calling a witness 
			who needs an interpreter, ask the clerk at the court registry to arrange for 
			an interpreter when you file your application for a court order. You can 
			also tell a judge or judicial case manager that you’ll need an interpreter 
			when you are setting a date for a trial or hearing.
		</p>
		<p>
			It is important to let court registry staff know as soon as possible that 
			you need an interpreter. If they cannot arrange an interpreter in time, 
			the judge may have to re-schedule your case.
		</p>

		<p>
			Find contact information for 
			<a 
				target="_blank" 
				href="https://www2.gov.bc.ca/gov/content?id=4372A527CC574299A7C0C225496F154F">
			your local court registry.
			</a>
		</p>


		<h3 name="interpreter-guide" class="my-4 text-primary">
			How do I find a professional interpreter? 
		</h3>

		<p>
			Get help finding a professional interpreter from:
			<ul>
				<li>
					<a
						target="_blank" 
						href="https://stibc.org/find-translator-interpreter/">
						Society of Translators and Interpreters of British Columbia
					</a>
				</li>
				<li>
					<a
						target="_blank" 
						href="https://mosaicbc.org/our-services/interpretation-and-translation-for-business/">
						Mosaic BC
					</a>
				</li>
				<li>
					<a
						target="_blank" 
						href="https://www.dcrs.ca/">
						DIVERSEcity
					</a>
				</li>
				<li>
					<a
						target="_blank" 
						href="https://www.yellowpages.ca/">
						The Yellow Pages
					</a> (under “translators and interpreters”)
				</li>
			</ul>
		</p>

		<h2 class="mb-0 text-primary">Multi-cultural legal information</h2>

		<p>
			You can get Information about court matters in various languages from:

			<ul>
				<li>
					Multicultural organizations - offer information and may help you find a professional interpreter.
				</li>
				<li>
					Your local library - information about multicultural groups and booklets on the law in various languages.
				</li>
				<li>
					<a
						target="_blank" 
						href="https://www.clicklaw.bc.ca/content/languages">
						Clicklaw</a> - links to legal information in languages including: Arabic, Chinese, 
						Farsi (Persian), French, Hindi, Japanese, Korean, Polish, Portuguese, Punjabi, 
						Russian, Spanish, Tagalog and Vietnamese.
				</li>
				<li>
					<a
						target="_blank" 
						href="https://justiceeducation.ca/ask-jes-multilingual">
						Justice Education Society</a> - personalized legal help to clients in English, 
						Mandarin, Cantonese, Punjabi, Hindi, and French.
				</li>
				<li>
					<a
						target="_blank" 
						href="https://www.mosaicbc.org/?q=multilingual-legal-publications">
						MOSAIC Multilingual Legal Publications</a> - legal information resources in: 
						Arabic, Chinese, French, Korean, Persian, Punjabi, Spanish, and Vietnamese.
				</li>
				<li>
					<a
						target="_blank" 
						href="http://www.courtinformation.ca/">
						Court Information Program for Immigrants</a> - free legal information and referrals 
						to new immigrants and refugees in multiple languages. Phone 604 760-5727 or 1-866-550-2474.
				</li>
				<li>
					<a
						target="_blank" 
						href="https://www.immigrantlegal.ca/">
						ImmigrantLegal.ca</a> - free legal information for newcomers to Canada and 
						people working with them.
				</li>
			</ul>

		</p>

	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class LanguageResources extends Vue {

	public navigateToGuide(){
        Vue.filter('scrollToLocation')("interpreter-guide");
    } 
}

</script>

