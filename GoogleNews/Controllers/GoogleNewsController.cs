using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.ServiceModel.Syndication;
using System.Xml;
using System.Runtime.Serialization.Json;
using System.Runtime.Caching;
using GoogleNews.Models;

namespace GoogleNews.Controllers
{
    public class GoogleNewsController : ApiController
    {

        SyndicationFeed getGoogleNews()
        {
            ObjectCache cache = MemoryCache.Default;
            SyndicationFeed feed = cache.Get("GoogleNews") as SyndicationFeed;
            if (feed != null)
                return feed;
            else
            {
                feed = getGoogleNewsFromApi();
                CacheItemPolicy policy = new CacheItemPolicy { AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(60) };
                cache.Add("GoogleNews", feed, policy);
                return feed;
            }

        }
        SyndicationFeed getGoogleNewsFromApi()
        {
            string url = "http://news.google.com/news?pz=1&cf=all&ned=en_il&hl=en&output=rss";
            XmlReader reader = XmlReader.Create(url);
            SyndicationFeed feed = SyndicationFeed.Load(reader);
            reader.Close();
            return feed;
        }
        // GET api/values
        public List<TitleViewModel> Get()
        {
            SyndicationFeed feed = getGoogleNews();
            var feeds = feed.Items.Select(x => new TitleViewModel() { Id = x.Id, Title = x.Title.Text }).ToList();
            return feeds;
        }

        // GET api/values/5
        public ItemViewModel Get(string id)
        {

            //example
            ItemViewModel item = new ItemViewModel();
            SyndicationFeed feed = getGoogleNews();
            var find = feed.Items.FirstOrDefault(x => x.Id == id);
            if (find != null)
            {
                item.Id = find.Id;
                var link = find.Links.FirstOrDefault();
                if (link != null) item.Link = link.Uri.OriginalString;
                item.Body = find.Summary.Text;
                item.Title = find.Title.Text;
            }
            return item;
        }

       
    }
}
