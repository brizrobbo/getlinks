Provides an API end-point that simply takes a supplied URL (as a JSON
object - see below) and then performs a GET request on that URL and returns all
the links as a JSON array. The returned array is de-duped and sorted. The links
returned are also made 'absolute' where they are 'root-relative'.

Typical request format:

{
    "url":"http://somedomain.com/index.html"
}