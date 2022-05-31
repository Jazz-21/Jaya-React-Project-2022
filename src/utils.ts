
function fixUrl(url: string): string {
	if( import.meta.env.MODE === 'development' ) {
		//console.log('DEV MODE')
		return 'http://localhost:1999' + url
	} else {
		//console.log('PRODUCTION MODE')
		return url
	}
}

export { fixUrl }

function picImport(imgName: string) {
	if (imgName.startsWith('https')){
	  return imgName
  
	} else {
	  return fixUrl((`/HamPics/${imgName}`))
	}
  }
  export { picImport }

